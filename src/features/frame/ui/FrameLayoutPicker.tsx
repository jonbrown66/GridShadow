import React from "react";
import { Card, CardContent } from "../../../shared/ui/card";
import { type FrameLayoutOption } from "../config/frameLayouts";

interface FrameLayoutPickerProps {
  options: FrameLayoutOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const FrameLayoutPicker: React.FC<FrameLayoutPickerProps> = ({
  options,
  selectedId,
  onSelect,
}) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-primary"></div>
        <h2 className="font-bold text-foreground text-[10px] tracking-[0.2em] uppercase font-mono">
          Frame Layout
        </h2>
      </div>
      <div className="space-y-2">
        {options.map((layout) => {
          const isActive = layout.id === selectedId;
          return (
            <Card
              key={layout.id}
              className={`border transition-colors cursor-pointer rounded-sm ${isActive ? "border-primary bg-primary/5" : "border-black/10 dark:border-white/10 bg-white dark:bg-black/40 hover:border-black/30 dark:hover:border-white/30"
                }`}
              onClick={() => onSelect(layout.id)}
            >
              <CardContent className="p-3 space-y-3">
                <div className="flex items-center justify-between font-mono">
                  <div>
                    <p className={`font-bold text-xs uppercase tracking-wider ${isActive ? "text-primary" : "text-foreground"}`}>
                      {layout.label}
                    </p>
                    <p className="text-[10px] tracking-widest text-muted-foreground uppercase mt-0.5">{layout.description}</p>
                  </div>
                  {isActive && (
                    <span className="inline-flex h-4 w-4 border border-primary items-center justify-center rounded-sm bg-primary/20 text-primary text-[10px] font-bold">
                      ✓
                    </span>
                  )}
                </div>
                <div className="rounded-sm border border-black/5 dark:border-white/5 bg-white dark:bg-black p-2 relative">
                  <div className="absolute inset-0 technical-grid opacity-30 mix-blend-overlay"></div>
                  <div
                    className="grid h-24 w-full relative z-10"
                    style={{
                      gridTemplateColumns: layout.columns,
                      gridTemplateRows: layout.rows,
                      gap: layout.gap,
                    }}
                  >
                    {layout.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`rounded-sm border ${isActive ? "border-primary/50 bg-primary/10" : "border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5"}`}
                        style={{
                          gridColumn: slot.gridColumn,
                          gridRow: slot.gridRow,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
