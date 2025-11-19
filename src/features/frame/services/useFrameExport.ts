import React from "react";
import {
  borderOptions,
  exportShadowPositions,
  resolutionPresets,
  shadowOptions,
  type ResolutionPresetKey,
} from "../../mockup/config/presets";
import { type FrameLayoutOption } from "../config/frameLayouts";
import { type FrameBackgroundFill } from "../config/backgroundPresets";

interface UseFrameExportProps {
  uploadedImages: (string | null)[];
  layout: FrameLayoutOption | null;
  layoutRatio: string;
  selectedBorder: number;
  selectedShadow: number;
  shadowColor: string;
  shadowOpacity: number;
  shadowPosition: number;
  downloadResolution: ResolutionPresetKey;
  backgroundFill: FrameBackgroundFill;
}

const SCALE_FACTOR = 2;
const CANVAS_MARGIN = 32;

const drawRoundedRectPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const parseGapToPx = (gap: string) => {
  const remMatch = gap.match(/([\d.]+)rem/);
  if (remMatch) {
    return parseFloat(remMatch[1]) * 16;
  }
  const pxMatch = gap.match(/([\d.]+)px/);
  if (pxMatch) {
    return parseFloat(pxMatch[1]);
  }
  return 16;
};

const parseGridSpan = (value: string) => {
  const [start, end] = value.split("/").map((part) => parseInt(part.trim(), 10));
  return { start, end };
};

const sumRange = (arr: number[], start: number, end: number) => {
  let total = 0;
  for (let i = start; i < end; i += 1) {
    total += arr[i] ?? 0;
  }
  return total;
};

const computeColumnWidths = (
  columnWeights: number[],
  totalWidth: number,
  gap: number,
) => {
  const gapTotal = gap * Math.max(0, columnWeights.length - 1);
  const usableWidth = totalWidth - gapTotal;
  const weightSum = columnWeights.reduce((acc, weight) => acc + weight, 0);

  return columnWeights.map((weight) =>
    usableWidth * (weight / weightSum),
  );
};

const computeRowHeights = (
  rowWeights: number[],
  totalHeight: number,
  gap: number,
) => {
  const gapTotal = gap * Math.max(0, rowWeights.length - 1);
  const usableHeight = totalHeight - gapTotal;
  const weightSum = rowWeights.reduce((acc, weight) => acc + weight, 0);

  return rowWeights.map((weight) =>
    usableHeight * (weight / weightSum),
  );
};

const getBaseHeight = (width: number, ratio: string) => {
  switch (ratio) {
    case "16:9":
      return (width * 9) / 16;
    case "9:16":
      return (width * 16) / 9;
    case "4:3":
      return (width * 3) / 4;
    case "3:4":
      return (width * 4) / 3;
    default:
      return width;
  }
};

const createCanvasGradient = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  angle: number,
) => {
  const angleInRad = ((90 - angle) * Math.PI) / 180;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const radius = Math.sqrt(halfWidth * halfWidth + halfHeight * halfHeight);
  const x0 = halfWidth - Math.cos(angleInRad) * radius;
  const y0 = halfHeight - Math.sin(angleInRad) * radius;
  const x1 = halfWidth + Math.cos(angleInRad) * radius;
  const y1 = halfHeight + Math.sin(angleInRad) * radius;
  return ctx.createLinearGradient(x0, y0, x1, y1);
};

export const useFrameExport = ({
  uploadedImages,
  layout,
  layoutRatio,
  selectedBorder,
  selectedShadow,
  shadowColor,
  shadowOpacity,
  shadowPosition,
  downloadResolution,
  backgroundFill,
}: UseFrameExportProps) => {
  const handleDownload = React.useCallback(async () => {
    if (!layout || !uploadedImages.some(Boolean)) return;

    const baseWidth = resolutionPresets[downloadResolution]?.width ?? 1920;
    const baseHeight = getBaseHeight(baseWidth, layoutRatio);

    const canvas = document.createElement("canvas");
    canvas.width = baseWidth * SCALE_FACTOR;
    canvas.height = baseHeight * SCALE_FACTOR;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(SCALE_FACTOR, SCALE_FACTOR);
    if (backgroundFill.mode === "gradient") {
      const gradient = createCanvasGradient(ctx, baseWidth, baseHeight, backgroundFill.angle);
      backgroundFill.stops.forEach((stop) => {
        gradient.addColorStop(stop.position / 100, stop.color);
      });
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = `rgba(${backgroundFill.r}, ${backgroundFill.g}, ${backgroundFill.b}, ${backgroundFill.opacity})`;
    }
    ctx.fillRect(0, 0, baseWidth, baseHeight);

    const gapPx = parseGapToPx(layout.gap);
    const gridWidth = baseWidth - CANVAS_MARGIN * 2;
    const gridHeight = baseHeight - CANVAS_MARGIN * 2;
    const columnWidths = computeColumnWidths(
      layout.columnWeights,
      gridWidth,
      gapPx,
    );
    const rowHeights = computeRowHeights(layout.rowWeights, gridHeight, gapPx);

    const slotPadding = Math.max(8, gapPx * 0.35);
    const borderRadius =
      borderOptions[selectedBorder]?.radiusPx ?? borderOptions[0].radiusPx;

    const imagesToRender = await Promise.all(
      layout.slots.map(async (slot, index) => {
        const source = uploadedImages[index];
        if (!source) return null;
        try {
          const image = await loadImage(source);
          return { slot, index, image };
        } catch {
          return null;
        }
      }),
    );

    for (const entry of imagesToRender) {
      if (!entry) continue;
      const { slot, index, image } = entry;
      const columnSpan = parseGridSpan(slot.gridColumn);
      const rowSpan = parseGridSpan(slot.gridRow);

      const startX =
        CANVAS_MARGIN +
        sumRange(columnWidths, 0, columnSpan.start - 1) +
        gapPx * (columnSpan.start - 1);
      const startY =
        CANVAS_MARGIN +
        sumRange(rowHeights, 0, rowSpan.start - 1) +
        gapPx * (rowSpan.start - 1);
      const slotWidth =
        sumRange(columnWidths, columnSpan.start - 1, columnSpan.end - 1) +
        gapPx * (columnSpan.end - columnSpan.start - 1);
      const slotHeight =
        sumRange(rowHeights, rowSpan.start - 1, rowSpan.end - 1) +
        gapPx * (rowSpan.end - rowSpan.start - 1);

      const drawWidth = Math.max(1, slotWidth - slotPadding * 2);
      const drawHeight = Math.max(1, slotHeight - slotPadding * 2);

      const offscreen = document.createElement("canvas");
      offscreen.width = Math.ceil(drawWidth * SCALE_FACTOR);
      offscreen.height = Math.ceil(drawHeight * SCALE_FACTOR);
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) continue;

      offCtx.scale(SCALE_FACTOR, SCALE_FACTOR);
      offCtx.save();
      drawRoundedRectPath(offCtx, 0, 0, drawWidth, drawHeight, borderRadius);
      offCtx.clip();

      const scale = Math.max(
        drawWidth / image.width,
        drawHeight / image.height,
      );
      const renderWidth = image.width * scale;
      const renderHeight = image.height * scale;
      const offsetX = (drawWidth - renderWidth) / 2;
      const offsetY = (drawHeight - renderHeight) / 2;

      offCtx.drawImage(image, offsetX, offsetY, renderWidth, renderHeight);
      offCtx.restore();

      ctx.save();
      if (selectedShadow > 0) {
        const shadowSetting = shadowOptions[selectedShadow];
        ctx.shadowColor = `${shadowColor}${Math.round(
          (shadowOpacity / 100) * 255,
        )
          .toString(16)
          .padStart(2, "0")}`;
        ctx.shadowBlur = shadowSetting?.canvasBlur ?? 0;
        const position =
          exportShadowPositions[shadowPosition] ?? exportShadowPositions[4];
        ctx.shadowOffsetX = position.x;
        ctx.shadowOffsetY = position.y;
      }

      ctx.drawImage(
        offscreen,
        0,
        0,
        offscreen.width,
        offscreen.height,
        startX + slotPadding,
        startY + slotPadding,
        drawWidth,
        drawHeight,
      );
      ctx.restore();

    }

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `gridshodow_frame_${downloadResolution}.png`;
      anchor.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [
    layout,
    uploadedImages,
    layoutRatio,
    selectedBorder,
    selectedShadow,
    shadowColor,
    shadowOpacity,
    shadowPosition,
    downloadResolution,
    backgroundFill,
  ]);

  return { handleDownload };
};
