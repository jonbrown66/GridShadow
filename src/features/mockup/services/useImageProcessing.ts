import React from "react";
import {
  borderOptions,
  exportShadowPositions,
  resolutionPresets,
  type ResolutionPresetKey,
  shadowOptions,
} from "../config/presets";

const drawRoundedRectPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  ctx.beginPath();
  if (radius <= 0) {
    ctx.rect(x, y, width, height);
    ctx.closePath();
    return;
  }
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

const toRgbaShadow = (hexColor: string, opacityPercent: number) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacityPercent / 100})`;
};

interface ImageProcessingProps {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  downloadResolution: ResolutionPresetKey;
  layoutRatio: string;
  imageSize: number;
  bgR: number;
  bgG: number;
  bgB: number;
  bgOpacityDecimal: number;
  selectedBorder: number;
  selectedShadow: number;
  shadowColor: string;
  shadowOpacity: number;
  shadowPosition: number;
}

export const useImageProcessing = ({
  uploadedImage,
  setUploadedImage,
  downloadResolution,
  layoutRatio,
  imageSize,
  bgR,
  bgG,
  bgB,
  bgOpacityDecimal,
  selectedBorder,
  selectedShadow,
  shadowColor,
  shadowOpacity,
  shadowPosition,
}: ImageProcessingProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!uploadedImage) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const baseWidth = resolutionPresets[downloadResolution]?.width ?? 1920;
    let baseHeight;
    if (layoutRatio === "16:9") {
      baseHeight = baseWidth * 9 / 16;
    } else if (layoutRatio === "9:16") {
      baseHeight = baseWidth * 16 / 9;
    } else if (layoutRatio === "4:3") {
      baseHeight = baseWidth * 3 / 4;
    } else if (layoutRatio === "3:4") {
      baseHeight = baseWidth * 4 / 3;
    } else {
      baseHeight = baseWidth; // 1:1
    }

    const scaleFactor = 2;
    const scaledWidth = baseWidth * scaleFactor;
    const scaledHeight = baseHeight * scaleFactor;
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;
    
    ctx.scale(scaleFactor, scaleFactor);

    const bgMargin = 8;
    
    ctx.fillStyle = `rgba(${bgR}, ${bgG}, ${bgB}, ${bgOpacityDecimal})`;
    ctx.fillRect(bgMargin, bgMargin, baseWidth - 2 * bgMargin, baseHeight - 2 * bgMargin);

    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((resolve) => {
      img.onload = () => {
        const imageAreaWidth = baseWidth - 2 * bgMargin;
        const imageAreaHeight = baseHeight - 2 * bgMargin;
        
        const paddingForImage = 40;
        const effectiveImageAreaWidth = imageAreaWidth * (imageSize / 100) - paddingForImage;
        const effectiveImageAreaHeight = imageAreaHeight * (imageSize / 100) - paddingForImage;

        const imgAspectRatio = img.width / img.height;
        let drawWidth, drawHeight;
        
        if (imgAspectRatio > effectiveImageAreaWidth / effectiveImageAreaHeight) {
          drawWidth = effectiveImageAreaWidth;
          drawHeight = effectiveImageAreaWidth / imgAspectRatio;
        } else {
          drawHeight = effectiveImageAreaHeight;
          drawWidth = effectiveImageAreaHeight * imgAspectRatio;
        }
        
        const drawX = bgMargin + (imageAreaWidth - drawWidth) / 2;
        const drawY = bgMargin + (imageAreaHeight - drawHeight) / 2;
        
        const borderRadius =
          borderOptions[selectedBorder]?.radiusPx ?? borderOptions[0].radiusPx;

        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = Math.ceil(drawWidth * scaleFactor);
        offscreenCanvas.height = Math.ceil(drawHeight * scaleFactor);
        const offCtx = offscreenCanvas.getContext("2d");
        if (!offCtx) {
          resolve();
          return;
        }

        offCtx.scale(scaleFactor, scaleFactor);
        offCtx.save();
        drawRoundedRectPath(offCtx, 0, 0, drawWidth, drawHeight, borderRadius);
        offCtx.clip();
        offCtx.drawImage(img, 0, 0, drawWidth, drawHeight);
        offCtx.restore();

        ctx.save();
        if (selectedShadow > 0) {
          ctx.shadowColor = toRgbaShadow(shadowColor, shadowOpacity);
          ctx.shadowBlur = shadowOptions[selectedShadow]?.canvasBlur ?? 0;

          const pos =
            exportShadowPositions[shadowPosition] ?? exportShadowPositions[4];
          ctx.shadowOffsetX = pos.x;
          ctx.shadowOffsetY = pos.y;
        }

        ctx.drawImage(
          offscreenCanvas,
          0,
          0,
          offscreenCanvas.width,
          offscreenCanvas.height,
          drawX,
          drawY,
          drawWidth,
          drawHeight,
        );
        ctx.restore();
        
        resolve();
      };
      img.src = uploadedImage;
    });

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `screenshot_${downloadResolution}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }, "image/png", 1.0);
  };

  return {
    handleImageUpload,
    handleDownload,
  };
};
