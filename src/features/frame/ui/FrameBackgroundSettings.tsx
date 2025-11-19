import React from "react";
import { Card, CardContent } from "../../../shared/ui/card";
import { ColorPicker } from "../../../shared/ui/color-picker";
import {
  frameBackgroundPresets,
  getBackgroundPresetCss,
} from "../config/backgroundPresets";

interface FrameBackgroundSettingsProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  backgroundOpacity: number;
  setBackgroundOpacity: (opacity: number) => void;
  showBgColorPicker: boolean;
  setShowBgColorPicker: (show: boolean) => void;
  bgColorWithOpacity: string;
  backgroundPresetId: string | null;
  selectBackgroundPreset: (presetId: string | null) => void;
}

export const FrameBackgroundSettings: React.FC<
  FrameBackgroundSettingsProps
> = ({
  backgroundColor,
  setBackgroundColor,
  backgroundOpacity,
  setBackgroundOpacity,
  showBgColorPicker,
  setShowBgColorPicker,
  bgColorWithOpacity,
  backgroundPresetId,
  selectBackgroundPreset,
}) => {
  const presetButtonClasses =
    "flex flex-col gap-2 rounded-2xl border-2 p-2 text-left transition hover:border-purple-200";

  return (
    <section>
      <h2 className="mb-4 font-medium text-gray-500 text-xs tracking-wide uppercase">
        FRAME BACKGROUND
      </h2>

      <div className="space-y-3">
        <div className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
          Presets
        </div>
        <div className="grid grid-cols-3 gap-3">
          {frameBackgroundPresets.map((preset) => {
            const isActive = backgroundPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                className={`${presetButtonClasses} ${
                  isActive ? "border-purple-500 shadow-sm" : "border-gray-200"
                }`}
                onClick={() => selectBackgroundPreset(preset.id)}
              >
                <div
                  className="h-12 w-full rounded-xl"
                  style={{ background: getBackgroundPresetCss(preset) }}
                />
                <span className="text-xs font-medium text-gray-600">
                  {preset.label}
                </span>
              </button>
            );
          })}
          <button
            type="button"
            className={`${presetButtonClasses} ${
              backgroundPresetId === null
                ? "border-purple-500 shadow-sm"
                : "border-dashed border-gray-300"
            }`}
            onClick={() => selectBackgroundPreset(null)}
          >
            <div className="flex h-12 w-full items-center justify-center rounded-xl border border-dashed border-gray-300 text-xs text-gray-500">
              Custom
            </div>
            <span className="text-xs font-medium text-gray-600">Custom color</span>
          </button>
        </div>
      </div>

      <Card
        className="cursor-pointer border-2 border-gray-200 transition-colors hover:border-purple-300"
        onClick={() => setShowBgColorPicker(true)}
      >
        <CardContent className="flex items-center gap-3 p-4">
          <div className="h-10 w-10 overflow-hidden rounded-lg border-2 border-gray-200">
            <div
              className="h-full w-full rounded-md"
              style={{ backgroundColor: bgColorWithOpacity }}
            />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-700">Color</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{backgroundColor}</span>
              <span className="text-xs text-gray-500">
                {backgroundOpacity}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {showBgColorPicker && (
        <ColorPicker
          color={backgroundColor}
          opacity={backgroundOpacity}
          onChange={(color, opacity) => {
            setBackgroundColor(color);
            setBackgroundOpacity(opacity);
          }}
          onClose={() => setShowBgColorPicker(false)}
        />
      )}
    </section>
  );
};
