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
      "flex flex-col gap-2 rounded-sm border border-black/10 dark:border-white/10 p-2 text-left transition hover:border-primary group bg-white dark:bg-black/40";

    return (
      <section>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 bg-primary"></div>
          <h2 className="font-bold text-foreground text-[10px] tracking-[0.2em] uppercase font-mono">
            Frame Background
          </h2>
        </div>

        <div className="space-y-3 mb-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground font-mono">
            Presets
          </div>
          <div className="grid grid-cols-3 gap-2">
            {frameBackgroundPresets.map((preset) => {
              const isActive = backgroundPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  className={`${presetButtonClasses} ${isActive ? "border-primary bg-primary/5" : ""
                    }`}
                  onClick={() => selectBackgroundPreset(preset.id)}
                >
                  <div
                    className={`h-10 w-full rounded-sm border ${isActive ? "border-primary/50" : "border-black/10 dark:border-white/10 group-hover:border-primary/50"}`}
                    style={{ background: getBackgroundPresetCss(preset) }}
                  />
                  <span className={`text-[10px] tracking-wider uppercase font-mono ${isActive ? "text-primary font-bold" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {preset.label}
                  </span>
                </button>
              );
            })}
            <button
              type="button"
              className={`${presetButtonClasses} ${backgroundPresetId === null
                ? "border-primary bg-primary/5"
                : ""
                }`}
              onClick={() => selectBackgroundPreset(null)}
            >
              <div className={`flex h-10 w-full items-center justify-center rounded-sm border border-dashed transition-colors ${backgroundPresetId === null ? "border-primary/50 text-primary" : "border-black/20 dark:border-white/20 text-muted-foreground group-hover:border-primary/50 group-hover:text-foreground"}`}>
                <span className="text-[10px] uppercase tracking-widest font-mono">Custom</span>
              </div>
              <span className={`text-[10px] tracking-wider uppercase font-mono ${backgroundPresetId === null ? "text-primary font-bold" : "text-muted-foreground group-hover:text-foreground"}`}>Custom</span>
            </button>
          </div>
        </div>

        <Card
          className="cursor-pointer border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-primary hover:bg-black/10 dark:hover:bg-white/10 transition-colors rounded-sm group"
          onClick={() => setShowBgColorPicker(true)}
        >
          <CardContent className="p-3 flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-sm border-2 border-black/10 dark:border-white/10 relative group-hover:border-primary/50 transition-colors">
              <div className="absolute inset-0 technical-grid opacity-30 mix-blend-overlay"></div>
              <div
                className="h-full w-full relative z-10"
                style={{ backgroundColor: bgColorWithOpacity }}
              />
            </div>
            <div className="flex-1 font-mono">
              <div className="font-bold text-foreground text-xs uppercase tracking-wider group-hover:text-primary transition-colors">Custom Color</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-muted-foreground border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 py-0.5 px-1.5 rounded-sm">{backgroundColor}</span>
                <span className="text-[10px] text-muted-foreground font-bold border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 py-0.5 px-1.5 rounded-sm">
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
