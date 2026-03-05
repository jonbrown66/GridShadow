import React from "react";
import { Card, CardContent } from "../../../shared/ui/card";
import { borderOptions } from "../config/presets";

interface BorderSettingsProps {
  selectedBorder: number;
  setSelectedBorder: (index: number) => void;
}

export const BorderSettings: React.FC<BorderSettingsProps> = ({
  selectedBorder,
  setSelectedBorder,
}) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-primary"></div>
        <h2 className="font-bold text-foreground text-[10px] tracking-[0.2em] uppercase font-mono">
          Geometry
        </h2>
      </div>
      <Card className="border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 rounded-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {borderOptions.map((option, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-3 cursor-pointer group"
                onClick={() => setSelectedBorder(index)}
              >
                <div
                  className={`w-full h-16 rounded-sm border overflow-hidden transition-colors ${selectedBorder === index ? "border-primary" : "border-black/10 dark:border-white/10 group-hover:border-black/30 dark:hover:border-white/30"
                    }`}
                >
                  <div className="w-full h-full bg-black/5 dark:bg-white/10 rounded-none relative">
                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3/5 w-1/2 bg-black/10 dark:bg-white/10 border border-white/40 ${option.borderRadiusClass}`}
                    />
                  </div>
                </div>
                <div className={`text-[10px] font-mono uppercase tracking-wider ${selectedBorder === index ? "text-primary font-bold" : "text-muted-foreground"}`}>
                  {option.label}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
