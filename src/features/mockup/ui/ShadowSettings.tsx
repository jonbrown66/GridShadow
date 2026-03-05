import React from "react";
import { Card, CardContent } from "../../../shared/ui/card";
import { ColorPicker } from "../../../shared/ui/color-picker";
import { shadowOptions } from "../config/presets";

interface ShadowSettingsProps {
  selectedShadow: number;
  setSelectedShadow: (index: number) => void;
  shadowColor: string;
  setShadowColor: (color: string) => void;
  shadowOpacity: number;
  setShadowOpacity: (opacity: number) => void;
  shadowPosition: number;
  setShadowPosition: (position: number) => void;
  showShadowColorPicker: boolean;
  setShowShadowColorPicker: (show: boolean) => void;
}

export const ShadowSettings: React.FC<ShadowSettingsProps> = ({
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
}) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-primary"></div>
        <h2 className="font-bold text-foreground text-[10px] tracking-[0.2em] uppercase font-mono">
          Depth & Shadow
        </h2>
      </div>
      <Card className="border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 rounded-sm">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {shadowOptions.map((option, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 cursor-pointer group"
                onClick={() => setSelectedShadow(index)}
              >
                <div
                  className={`w-full h-16 rounded-sm border overflow-hidden transition-colors ${selectedShadow === index ? "border-primary" : "border-black/10 dark:border-white/10 group-hover:border-black/30 dark:hover:border-white/30"
                    }`}
                >
                  <div className="w-full h-full bg-black/5 dark:bg-white/10 rounded-none overflow-hidden relative">
                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-3/4 bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 transition-all ${option.previewClass}`}
                    />
                  </div>
                </div>
                <div className={`text-[10px] uppercase font-mono tracking-wider ${selectedShadow === index ? "text-primary font-bold" : "text-muted-foreground"}`}>
                  {option.label}
                </div>
              </div>
            ))}
          </div>

          <Card
            className="cursor-pointer border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-primary hover:bg-black/10 dark:hover:bg-white/10 transition-colors rounded-sm group"
            onClick={() => setShowShadowColorPicker(true)}
          >
            <CardContent className="p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm border-2 border-black/10 dark:border-white/10 overflow-hidden relative group-hover:border-primary/50 transition-colors">
                <div className="absolute inset-0 technical-grid opacity-30 mix-blend-overlay"></div>
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: `${shadowColor}${Math.round((shadowOpacity / 100) * 255).toString(16).padStart(2, "0")}` }}
                />
              </div>
              <div className="flex-1 font-mono">
                <div className="font-bold text-foreground text-xs uppercase tracking-wider group-hover:text-primary transition-colors">Color / Opacity</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 py-0.5 px-1.5 rounded-sm">{shadowColor}</span>
                  <span className="text-[10px] text-muted-foreground font-bold border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 py-0.5 px-1.5 rounded-sm">
                    {shadowOpacity}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-sm">
            <CardContent className="p-4">
              <div className="font-bold text-foreground text-xs uppercase tracking-wider font-mono mb-3">
                Light Source Offset
              </div>
              <div className="grid grid-cols-3 gap-1 max-w-[120px] mx-auto">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setShadowPosition(pos)}
                    className={`w-8 h-8 rounded-sm border flex items-center justify-center transition-colors ${shadowPosition === pos
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-black/10 dark:border-white/10 text-muted-foreground hover:border-black/30 dark:hover:border-white/30 hover:text-foreground"
                      }`}
                  >
                    {pos === 4 ? (
                      <div className="w-1.5 h-1.5 bg-current rounded-sm"></div>
                    ) : (
                      <svg width="10" height="10" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                        {pos === 0 && <path d="M7 7L1 1M1 7V1H7" />}
                        {pos === 1 && <path d="M4 7V1M1 4L4 1L7 4" />}
                        {pos === 2 && <path d="M7 1L1 7M1 1H7V7" />}
                        {pos === 3 && <path d="M7 4H1M4 1L1 4L4 7" />}
                        {pos === 5 && <path d="M1 4H7M4 1L7 4L4 7" />}
                        {pos === 6 && <path d="M1 7L7 1M7 7H1V1" />}
                        {pos === 7 && <path d="M4 1V7M1 4L4 7L7 4" />}
                        {pos === 8 && <path d="M1 1L7 7M7 1V7H1" />}
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {showShadowColorPicker && (
        <ColorPicker
          color={shadowColor}
          opacity={shadowOpacity}
          onChange={(color, opacity) => {
            setShadowColor(color);
            setShadowOpacity(opacity);
          }}
          onClose={() => setShowShadowColorPicker(false)}
        />
      )}
    </section>
  );
};
