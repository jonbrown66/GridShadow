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
      <h2 className="mb-4 font-medium text-gray-500 text-xs tracking-wide uppercase">
        BACKGROUND
      </h2>
      <Card
        className="cursor-pointer border-2 border-gray-200 hover:border-purple-300 transition-colors"
        onClick={() => setShowBgColorPicker(true)}
      >
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border-2 border-gray-200 overflow-hidden">
            <div
              className="w-full h-full rounded-md"
              style={{ backgroundColor: bgColorWithOpacity }}
            />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-700 text-sm">Color</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{backgroundColor}</span>
              <span className="text-xs text-gray-500">
                {backgroundOpacity}%
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
