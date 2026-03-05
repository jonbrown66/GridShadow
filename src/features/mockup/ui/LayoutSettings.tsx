import React from "react";
import { Card, CardContent } from "../../../shared/ui/card";
import { layoutOptions } from "../config/presets";

interface LayoutSettingsProps {
  layoutRatio: string;
  setLayoutRatio: (ratio: string) => void;
}

export const LayoutSettings: React.FC<LayoutSettingsProps> = ({
  layoutRatio,
  setLayoutRatio,
}) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-primary"></div>
        <h2 className="font-bold text-foreground text-[10px] tracking-[0.2em] uppercase font-mono">
          Canvas Ratio
        </h2>
      </div>
      <Card className="border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 rounded-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {layoutOptions.map(({ key, label }) => (
              <div
                key={key}
                className={`flex flex-col items-center justify-center p-3 border rounded-sm cursor-pointer transition-all ${layoutRatio === key
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-black/10 dark:border-white/10 text-muted-foreground hover:border-black/30 dark:hover:border-white/30 hover:text-foreground"
                  }`}
                onClick={() => setLayoutRatio(key)}
              >
                <div className="font-bold text-xs tracking-wider uppercase font-mono">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
