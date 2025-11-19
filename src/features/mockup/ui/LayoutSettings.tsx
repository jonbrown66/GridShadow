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
      <h2 className="mb-4 font-medium text-gray-500 text-xs tracking-wide uppercase">
        LAYOUT
      </h2>
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {layoutOptions.map(({ key, label }) => (
              <div
                key={key}
                className={`flex flex-col items-center gap-2 cursor-pointer p-2 rounded-lg border-2 ${
                  layoutRatio === key
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300"
                }`}
                onClick={() => setLayoutRatio(key)}
              >
                <div className="font-medium text-gray-700 text-sm">
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
