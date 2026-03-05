import React from "react";
import { Card, CardContent } from "../../../shared/ui/card";
import { ColorPicker } from "../../../shared/ui/color-picker";

interface BackgroundSettingsProps {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  backgroundOpacity: number;
  setBackgroundOpacity: (opacity: number) => void;
  showBgColorPicker: boolean;
  setShowBgColorPicker: (show: boolean) => void;
  bgColorWithOpacity: string;
}

export const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({
  backgroundColor,
  setBackgroundColor,
  backgroundOpacity,
  setBackgroundOpacity,
  showBgColorPicker,
  setShowBgColorPicker,
  bgColorWithOpacity,
}) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-primary"></div>
        <h2 className="font-bold text-foreground text-[10px] tracking-[0.2em] uppercase font-mono">
          Environment
        </h2>
      </div>
      <Card
        className="cursor-pointer border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 hover:bg-black/5 dark:hover:bg-white/10 hover:border-primary transition-all duration-200 rounded-sm overflow-hidden group"
        onClick={() => setShowBgColorPicker(true)}
      >
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-sm border border-black/20 dark:border-white/20 overflow-hidden flex-shrink-0 relative group-hover:scale-110 transition-transform">
            <div
              className="w-full h-full"
              style={{ backgroundColor: bgColorWithOpacity }}
            />
            <div className="absolute inset-0 technical-grid opacity-30 mix-blend-overlay"></div>
          </div>
          <div className="flex-1">
            <div className="font-bold text-foreground text-[13px] tracking-tight group-hover:text-primary transition-colors font-mono uppercase">Background</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-mono text-muted-foreground border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded-sm">{backgroundColor}</span>
              <span className="text-[10px] font-bold text-muted-foreground border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded-sm">
                A:{backgroundOpacity}%
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
