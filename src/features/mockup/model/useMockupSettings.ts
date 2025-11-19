import React from "react";
import {
  borderOptions,
  layoutOptions,
  previewShadowPositions,
  resolutionOptions,
  type ResolutionPresetKey,
  shadowOptions,
} from "../config/presets";

export const useMockupSettings = () => {
  const [backgroundColor, setBackgroundColor] = React.useState("#efefef");
  const [backgroundOpacity, setBackgroundOpacity] = React.useState(100);
  const [showBgColorPicker, setShowBgColorPicker] = React.useState(false);

  const [selectedShadow, setSelectedShadow] = React.useState(1);
  const [shadowColor, setShadowColor] = React.useState("#000000");
  const [shadowOpacity, setShadowOpacity] = React.useState(10);
  const [shadowPosition, setShadowPosition] = React.useState(7);
  const [showShadowColorPicker, setShowShadowColorPicker] = React.useState(false);

  const [selectedBorder, setSelectedBorder] = React.useState(2);

  const [uploadedImage, setUploadedImage] = React.useState<string | null>(null);

  const [downloadResolution, setDownloadResolution] =
    React.useState<ResolutionPresetKey>("1080p");
  const [showResolutionMenu, setShowResolutionMenu] = React.useState(false);

  const [layoutRatio, setLayoutRatio] = React.useState("16:9");
  const [imageSize, setImageSize] = React.useState(100);

  const bgOpacityHex = Math.round((backgroundOpacity / 100) * 255)
    .toString(16)
    .padStart(2, "0");
  const bgColorWithOpacity = `${backgroundColor}${bgOpacityHex}`;

  const bgOpacityDecimal = backgroundOpacity / 100;
  const bgR = parseInt(backgroundColor.slice(1, 3), 16);
  const bgG = parseInt(backgroundColor.slice(3, 5), 16);
  const bgB = parseInt(backgroundColor.slice(5, 7), 16);

  const getShadowStyle = React.useCallback(() => {
    const option = shadowOptions[selectedShadow];
    if (!option || option.blurPx === 0) return "";

    const opacityHex = Math.round((shadowOpacity / 100) * 255)
      .toString(16)
      .padStart(2, "0");
    const color = `${shadowColor}${opacityHex}`;
    const offset =
      previewShadowPositions[shadowPosition] ?? previewShadowPositions[4];

    return `${offset.x}px ${offset.y}px ${option.blurPx}px ${color}`;
  }, [selectedShadow, shadowOpacity, shadowColor, shadowPosition]);

  return {
    backgroundColor,
    setBackgroundColor,
    backgroundOpacity,
    setBackgroundOpacity,
    showBgColorPicker,
    setShowBgColorPicker,
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
    uploadedImage,
    setUploadedImage,
    downloadResolution,
    setDownloadResolution,
    showResolutionMenu,
    setShowResolutionMenu,
    layoutRatio,
    setLayoutRatio,
    imageSize,
    setImageSize,
    bgColorWithOpacity,
    bgOpacityDecimal,
    bgR,
    bgG,
    bgB,
    getShadowStyle,
    shadowOptions,
    borderOptions,
    layoutOptions,
    resolutionOptions,
  };
};
