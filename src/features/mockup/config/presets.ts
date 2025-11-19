export interface UploadIcon {
  src: string;
  alt: string;
}

export interface BorderOption {
  label: string;
  borderRadiusClass: string;
  radiusPx: number;
}

export interface ShadowOption {
  label: string;
  previewClass: string;
  blurPx: number;
  canvasBlur: number;
}

const baseShadowPositions = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
] as const;

export const previewShadowPositions = baseShadowPositions.map((pos) => ({
  x: pos.x * 5,
  y: pos.y * 5,
}));

export const exportShadowPositions = baseShadowPositions.map((pos) => ({
  x: pos.x * 15,
  y: pos.y * 15,
}));


export const borderOptions: BorderOption[] = [
  { label: "Sharp", borderRadiusClass: "", radiusPx: 0 },
  { label: "Curved", borderRadiusClass: "rounded-[15px]", radiusPx: 15 },
  { label: "Round", borderRadiusClass: "rounded-[30px]", radiusPx: 30 },
];

export const shadowOptions: ShadowOption[] = [
  {
    label: "None",
    previewClass: "",
    blurPx: 0,
    canvasBlur: 0,
  },
  {
    label: "Hug",
    previewClass: "shadow-[0px_1px_2px_-1px_#0000001a,-5px_5px_5px_#0000001a]",
    blurPx: 5,
    canvasBlur: 20,
  },
  {
    label: "Adaptive",
    previewClass: "shadow-[0px_4px_6px_-1px_#00000033,-7px_7px_5px_#00000033]",
    blurPx: 10,
    canvasBlur: 40,
  },
];

export const layoutOptions = [
  { key: "16:9", label: "16 : 9" },
  { key: "9:16", label: "9 : 16" },
  { key: "4:3", label: "4 : 3" },
  { key: "3:4", label: "3 : 4" },
  { key: "1:1", label: "1 : 1" },
] as const;

export const resolutionPresets = {
  "720p": { label: "720p", width: 1280 },
  "1080p": { label: "1080p", width: 1920 },
  "2K": { label: "2K", width: 2560 },
} as const;

export type ResolutionPresetKey = keyof typeof resolutionPresets;

export const resolutionOptions = Object.entries(resolutionPresets).map(
  ([key, value]) => ({
    key: key as ResolutionPresetKey,
    label: value.label,
  }),
);
