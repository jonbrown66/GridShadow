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
      <h2 className="mb-4 font-medium text-gray-500 text-xs tracking-wide uppercase">
        BORDER
      </h2>
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-3">
            {borderOptions.map((option, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => setSelectedBorder(index)}
              >
                <div
                  className={`w-full h-16 rounded-lg border-2 overflow-hidden ${
                    selectedBorder === index ? "border-purple-500" : "border-gray-200"
                  }`}
                >
                  <div className="w-full h-full bg-gray-100 rounded-lg">
                    <div
                      className={`h-3/5 w-1/2 mx-auto mt-2 bg-white border-2 border-gray-700 ${option.borderRadiusClass}`}
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-center">
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
