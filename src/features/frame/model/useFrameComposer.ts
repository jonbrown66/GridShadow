import React from "react";
import { getFrameLayouts, type FrameLayoutOption } from "../config/frameLayouts";
import {
  frameBackgroundPresets,
  getBackgroundPresetCss,
  type FrameBackgroundFill,
} from "../config/backgroundPresets";
import {
  borderOptions,
  layoutOptions,
  previewShadowPositions,
  shadowOptions,
  type ResolutionPresetKey,
} from "../../mockup/config/presets";

const MIN_IMAGES = 1;
const MAX_IMAGES = 9;
const DEFAULT_IMAGES = 3;

const clampImages = (value: number) =>
  Math.min(MAX_IMAGES, Math.max(MIN_IMAGES, Math.round(value)));

const createInitialImages = (count: number) =>
  Array.from({ length: count }, () => null as string | null);

export const useFrameComposer = () => {
  const [imageCount, setImageCount] = React.useState(DEFAULT_IMAGES);
  const [selectedLayoutId, setSelectedLayoutId] = React.useState(() => {
    const initialLayouts = getFrameLayouts(DEFAULT_IMAGES);
    return initialLayouts[0]?.id ?? "";
  });

  const [uploadedImages, setUploadedImages] = React.useState<(string | null)[]>(
    () => createInitialImages(DEFAULT_IMAGES),
  );

  const [backgroundColor, setBackgroundColorState] = React.useState("#efefef");
  const [backgroundOpacity, setBackgroundOpacityState] = React.useState(95);
  const [backgroundPresetId, setBackgroundPresetId] = React.useState<string | null>(null);
  const [showBgColorPicker, setShowBgColorPicker] = React.useState(false);

  const [selectedShadow, setSelectedShadow] = React.useState(1);
  const [shadowColor, setShadowColor] = React.useState("#000000");
  const [shadowOpacity, setShadowOpacity] = React.useState(12);
  const [shadowPosition, setShadowPosition] = React.useState(8);
  const [showShadowColorPicker, setShowShadowColorPicker] = React.useState(false);

  const [selectedBorder, setSelectedBorder] = React.useState(1);
  const [layoutRatio, setLayoutRatio] = React.useState<string>(
    layoutOptions[0]?.key ?? "16:9",
  );
  const [downloadResolution, setDownloadResolution] =
    React.useState<ResolutionPresetKey>("1080p");
  const [showResolutionMenu, setShowResolutionMenu] = React.useState(false);

  const layoutPresets = React.useMemo(
    () => getFrameLayouts(imageCount),
    [imageCount],
  );

  React.useEffect(() => {
    setSelectedLayoutId((current) => {
      if (layoutPresets.some((preset) => preset.id === current)) {
        return current;
      }
      return layoutPresets[0]?.id ?? "";
    });
  }, [layoutPresets]);

  React.useEffect(() => {
    setUploadedImages((prev) => {
      if (imageCount > prev.length) {
        return [
          ...prev,
          ...createInitialImages(imageCount - prev.length),
        ];
      }
      return prev.slice(0, imageCount);
    });
  }, [imageCount]);

  const selectedLayout = React.useMemo<FrameLayoutOption | null>(() => {
    return layoutPresets.find((preset) => preset.id === selectedLayoutId) ?? layoutPresets[0] ?? null;
  }, [layoutPresets, selectedLayoutId]);

  const bgOpacityDecimal = backgroundOpacity / 100;
  const bgR = parseInt(backgroundColor.slice(1, 3), 16);
  const bgG = parseInt(backgroundColor.slice(3, 5), 16);
  const bgB = parseInt(backgroundColor.slice(5, 7), 16);
  const bgOpacityHex = Math.round((backgroundOpacity / 100) * 255)
    .toString(16)
    .padStart(2, "0");
  const bgColorWithOpacity = `${backgroundColor}${bgOpacityHex}`;

  const selectedBackgroundPreset = React.useMemo(() => {
    if (!backgroundPresetId) return null;
    return frameBackgroundPresets.find((preset) => preset.id === backgroundPresetId) ?? null;
  }, [backgroundPresetId]);

  const backgroundFill = React.useMemo<FrameBackgroundFill>(() => {
    if (selectedBackgroundPreset?.type === "gradient") {
      return {
        mode: "gradient",
        angle: selectedBackgroundPreset.angle,
        stops: selectedBackgroundPreset.stops,
      };
    }
    return {
      mode: "solid",
      r: bgR,
      g: bgG,
      b: bgB,
      opacity: bgOpacityDecimal,
    };
  }, [selectedBackgroundPreset, bgR, bgG, bgB, bgOpacityDecimal]);

  const backgroundStyle =
    selectedBackgroundPreset?.type === "gradient"
      ? getBackgroundPresetCss(selectedBackgroundPreset)
      : `rgba(${bgR}, ${bgG}, ${bgB}, ${bgOpacityDecimal})`;

  const setBackgroundColor = React.useCallback((color: string) => {
    setBackgroundPresetId(null);
    setBackgroundColorState(color);
  }, []);

  const setBackgroundOpacity = React.useCallback((opacity: number) => {
    setBackgroundPresetId(null);
    setBackgroundOpacityState(opacity);
  }, []);

  const selectBackgroundPreset = React.useCallback((presetId: string | null) => {
    if (!presetId) {
      setBackgroundPresetId(null);
      return;
    }
    const preset = frameBackgroundPresets.find((item) => item.id === presetId);
    if (!preset) return;
    setBackgroundPresetId(presetId);
    if (preset.type === "solid") {
      setBackgroundColorState(preset.color);
      setBackgroundOpacityState((prev) =>
        preset.defaultOpacity !== undefined ? preset.defaultOpacity : prev,
      );
    }
  }, []);

  const getShadowStyle = React.useCallback(() => {
    const option = shadowOptions[selectedShadow];
    if (!option || option.blurPx === 0) return "";

    const opacityHex = Math.round((shadowOpacity / 100) * 255)
      .toString(16)
      .padStart(2, "0");
    const offset =
      previewShadowPositions[shadowPosition] ?? previewShadowPositions[4];
    return `${offset.x}px ${offset.y}px ${option.blurPx}px ${shadowColor}${opacityHex}`;
  }, [selectedShadow, shadowOpacity, shadowColor, shadowPosition]);

  const handleSlotUpload = React.useCallback(
    (slotIndex: number, file: File) => {
      if (!file || !file.type.startsWith("image/") || slotIndex >= imageCount) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImages((prev) => {
          const next = [...prev];
          next[slotIndex] = result;
          return next;
        });
      };
      reader.readAsDataURL(file);
    },
    [imageCount],
  );

  const handleClearSlot = React.useCallback((slotIndex: number) => {
    setUploadedImages((prev) => {
      if (slotIndex >= prev.length) return prev;
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  }, []);

  const setClampedImageCount = React.useCallback((value: number) => {
    setImageCount((current) => {
      const next = clampImages(value);
      if (next === current) {
        return current;
      }
      return next;
    });
  }, []);

  return {
    imageCount,
    setImageCount: setClampedImageCount,
    layoutPresets,
    selectedLayoutId,
    setSelectedLayoutId,
    selectedLayout,
    uploadedImages,
    handleSlotUpload,
    handleClearSlot,
    backgroundColor,
    setBackgroundColor,
    backgroundOpacity,
    setBackgroundOpacity,
    showBgColorPicker,
    setShowBgColorPicker,
    bgColorWithOpacity,
    backgroundPresetId,
    selectBackgroundPreset,
    backgroundStyle,
    backgroundFill,
    bgR,
    bgG,
    bgB,
    bgOpacityDecimal,
    selectedShadow,
    setSelectedShadow,
    shadowColor,
    setShadowColor,
    shadowOpacity,
    setShadowOpacity,
    shadowPosition,
    setShadowPosition,
    showShadowColorPicker,
    setShowShadowColorPicker,
    selectedBorder,
    setSelectedBorder,
    layoutRatio,
    setLayoutRatio,
    getShadowStyle,
    downloadResolution,
    setDownloadResolution,
    showResolutionMenu,
    setShowResolutionMenu,
  };
};
