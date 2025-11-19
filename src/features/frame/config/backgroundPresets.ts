export type FrameBackgroundPresetType = "solid" | "gradient";

export interface FrameBackgroundPresetBase {
  id: string;
  label: string;
  type: FrameBackgroundPresetType;
  group: "solid" | "gradient";
}

export interface FrameSolidBackgroundPreset extends FrameBackgroundPresetBase {
  type: "solid";
  group: "solid";
  color: string;
  defaultOpacity?: number;
}

export interface FrameGradientStop {
  color: string;
  position: number;
}

export interface FrameGradientBackgroundPreset
  extends FrameBackgroundPresetBase {
  type: "gradient";
  group: "gradient";
  angle: number;
  stops: FrameGradientStop[];
}

export type FrameBackgroundPreset =
  | FrameSolidBackgroundPreset
  | FrameGradientBackgroundPreset;

export type FrameBackgroundFill =
  | {
      mode: "solid";
      r: number;
      g: number;
      b: number;
      opacity: number;
    }
  | {
      mode: "gradient";
      angle: number;
      stops: FrameGradientStop[];
    };

export const frameBackgroundPresets: FrameBackgroundPreset[] = [
  {
    id: "solid-porcelain",
    label: "Porcelain",
    type: "solid",
    group: "solid",
    color: "#f9f4ef",
    defaultOpacity: 100,
  },
  {
    id: "solid-fog",
    label: "Soft Fog",
    type: "solid",
    group: "solid",
    color: "#e8ecf4",
    defaultOpacity: 100,
  },
  {
    id: "solid-ink",
    label: "Graphite",
    type: "solid",
    group: "solid",
    color: "#161b24",
    defaultOpacity: 100,
  },
  {
    id: "solid-cloud",
    label: "Airy Cloud",
    type: "solid",
    group: "solid",
    color: "#f8fbff",
    defaultOpacity: 100,
  },
  {
    id: "solid-blush",
    label: "Modern Blush",
    type: "solid",
    group: "solid",
    color: "#ffe8f1",
    defaultOpacity: 100,
  },
  {
    id: "solid-mint",
    label: "Digital Mint",
    type: "solid",
    group: "solid",
    color: "#e1fff4",
    defaultOpacity: 100,
  },
  {
    id: "solid-noir",
    label: "Night Noir",
    type: "solid",
    group: "solid",
    color: "#080c16",
    defaultOpacity: 95,
  },
  {
    id: "gradient-ios-sunrise",
    label: "iOS Sunrise",
    type: "gradient",
    group: "gradient",
    angle: 135,
    stops: [
      { color: "#ff9a8b", position: 0 },
      { color: "#ff6a88", position: 48 },
      { color: "#ff99ac", position: 100 },
    ],
  },
  {
    id: "gradient-ios-mojito",
    label: "iOS Mojito",
    type: "gradient",
    group: "gradient",
    angle: 135,
    stops: [
      { color: "#42e695", position: 0 },
      { color: "#3bb2b8", position: 50 },
      { color: "#2f80ed", position: 100 },
    ],
  },
  {
    id: "gradient-ios-galaxy",
    label: "iOS Galaxy",
    type: "gradient",
    group: "gradient",
    angle: 120,
    stops: [
      { color: "#a18cd1", position: 0 },
      { color: "#fbc2eb", position: 45 },
      { color: "#fad0c4", position: 100 },
    ],
  },
  {
    id: "gradient-ios-midnight",
    label: "iOS Midnight",
    type: "gradient",
    group: "gradient",
    angle: 160,
    stops: [
      { color: "#09203f", position: 0 },
      { color: "#537895", position: 100 },
    ],
  },
  {
    id: "gradient-neon-sunset",
    label: "Neon Sunset",
    type: "gradient",
    group: "gradient",
    angle: 140,
    stops: [
      { color: "#ff6cab", position: 0 },
      { color: "#7366ff", position: 50 },
      { color: "#3cba92", position: 100 },
    ],
  },
  {
    id: "gradient-aurora",
    label: "Aurora Mint",
    type: "gradient",
    group: "gradient",
    angle: 120,
    stops: [
      { color: "#b6f3ff", position: 0 },
      { color: "#92f7c7", position: 45 },
      { color: "#6fe1ff", position: 100 },
    ],
  },
  {
    id: "gradient-midnight-neon",
    label: "Midnight Neon",
    type: "gradient",
    group: "gradient",
    angle: 160,
    stops: [
      { color: "#0f0c29", position: 0 },
      { color: "#302b63", position: 50 },
      { color: "#24243e", position: 100 },
    ],
  },
  {
    id: "gradient-peach-haze",
    label: "Peach Horizon",
    type: "gradient",
    group: "gradient",
    angle: 135,
    stops: [
      { color: "#ffd3a5", position: 0 },
      { color: "#fd6585", position: 70 },
      { color: "#fa7d82", position: 100 },
    ],
  },
];

export const getBackgroundPresetCss = (preset: FrameBackgroundPreset): string => {
  if (preset.type === "solid") {
    return preset.color;
  }
  const stops = preset.stops
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");
  return `linear-gradient(${preset.angle}deg, ${stops})`;
};
