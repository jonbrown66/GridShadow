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
      <h2 className="mb-4 font-medium text-gray-500 text-xs tracking-wide uppercase">
        LAYOUTS
      </h2>
      <div className="space-y-3">
        {options.map((layout) => {
          const isActive = layout.id === selectedId;
          return (
            <Card
              key={layout.id}
              className={`border-2 transition-colors ${
                isActive ? "border-purple-500" : "border-gray-200 hover:border-purple-300"
              }`}
              onClick={() => onSelect(layout.id)}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {layout.label}
                    </p>
                    <p className="text-xs text-gray-500">{layout.description}</p>
                  </div>
                  {isActive && (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-white text-xs">
                      ✓
                    </span>
                  )}
                </div>
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3">
                  <div
                    className="grid h-32 w-full"
                    style={{
                      gridTemplateColumns: layout.columns,
                      gridTemplateRows: layout.rows,
                      gap: layout.gap,
                    }}
                  >
                    {layout.slots.map((slot) => (
                      <div
                        key={slot.id}
                        className="rounded-lg bg-white shadow-sm"
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
