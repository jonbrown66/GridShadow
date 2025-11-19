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
      <h2 className="mb-4 font-medium text-gray-500 text-xs tracking-wide uppercase">
        IMAGES
      </h2>
      <Card className="border border-gray-200">
        <CardContent className="p-4 space-y-4">
          <p className="text-sm text-gray-600">
            Choose how many images you want to arrange.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {counts.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => onChange(count)}
                className={`h-10 rounded-lg border text-sm font-medium transition-colors ${
                  value === count
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 text-gray-600 hover:border-purple-300"
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
