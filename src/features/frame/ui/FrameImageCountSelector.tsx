import React from "react";
import { Card, CardContent } from "../../../shared/ui/card";

interface FrameImageCountSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const counts = Array.from({ length: 9 }, (_, index) => index + 1);

export const FrameImageCountSelector: React.FC<
  FrameImageCountSelectorProps
> = ({ value, onChange }) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-primary"></div>
        <h2 className="font-bold text-foreground text-[10px] tracking-[0.2em] uppercase font-mono">
          Media Count
        </h2>
      </div>
      <Card className="border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 rounded-sm">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-5 gap-1.5">
            {counts.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => onChange(count)}
                className={`h-8 flex items-center justify-center rounded-sm border font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${value === count
                    ? "border-primary bg-primary/20 text-primary"
                    : "border-black/10 dark:border-white/10 text-muted-foreground hover:border-black/30 dark:hover:border-white/30 hover:text-foreground bg-black/5 dark:bg-white/5"
                  }`}
              >
                {count}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
