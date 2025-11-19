import React from "react";
import { Card, CardContent } from "../../../shared/ui/card";
import { ColorPicker } from "../../../shared/ui/color-picker";
import { shadowOptions } from "../config/presets";

interface ShadowSettingsProps {
  selectedShadow: number;
  setSelectedShadow: (index: number) => void;
  shadowColor: string;
  setShadowColor: (color: string) => void;
  shadowOpacity: number;
  setShadowOpacity: (opacity: number) => void;
  shadowPosition: number;
  setShadowPosition: (position: number) => void;
  showShadowColorPicker: boolean;
  setShowShadowColorPicker: (show: boolean) => void;
}

export const ShadowSettings: React.FC<ShadowSettingsProps> = ({
  selectedShadow,
  setSelectedShadow,
  shadowColor,
  setShadowColor,
  shadowOpacity,
  setShadowOpacity,
  shadowPosition,
  setShadowPosition,
  showShadowColorPicker,
  setShowShadowColorPicker,
}) => {
  return (
    <section>
      <h2 className="mb-4 font-medium text-gray-500 text-xs tracking-wide uppercase">
        SHADOW
      </h2>
      <Card className="border border-gray-200">
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {shadowOptions.map((option, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 cursor-pointer"
                onClick={() => setSelectedShadow(index)}
              >
                <div
                  className={`w-full h-16 rounded-lg border-2 overflow-hidden ${
                    selectedShadow === index ? "border-purple-500" : "border-gray-200"
                  }`}
                >
                  <div className="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className={`h-full w-3/4 mx-auto mt-2 bg-white rounded-lg ${option.previewClass}`}
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-center">
                  {option.label}
                </div>
              </div>
            ))}
          </div>

          <Card
            className="cursor-pointer border-2 border-gray-200 hover:border-purple-300 transition-colors"
            onClick={() => setShowShadowColorPicker(true)}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border-2 border-gray-200 overflow-hidden">
                <div
                  className="w-full h-full rounded-md"
                  style={{ backgroundColor: `${shadowColor}${Math.round((shadowOpacity / 100) * 255).toString(16).padStart(2, "0")}` }}
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-700 text-sm">Color</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{shadowColor}</span>
                  <span className="text-xs text-gray-500">
                    {shadowOpacity}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <div className="font-medium text-gray-700 text-sm mb-3">
                Position
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setShadowPosition(pos)}
                    className={`w-7 h-7 rounded border flex items-center justify-center ${
                      shadowPosition === pos
                        ? "border-purple-500 bg-purple-100"
                        : "border-gray-300 hover:border-purple-300"
                    }`}
                  >
                    {pos === 4 ? (
                      <svg width="4" height="4" viewBox="0 0 4 4" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2" cy="2" r="2" />
                      </svg>
                    ) : (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        {pos === 0 && <path d="M7 7L1 1M1 7V1H7" />}
                        {pos === 1 && <path d="M4 7V1M1 4L4 1L7 4" />}
                        {pos === 2 && <path d="M7 1L1 7M1 1H7V7" />}
                        {pos === 3 && <path d="M7 4H1M4 1L1 4L4 7" />}
                        {pos === 5 && <path d="M1 4H7M4 1L7 4L4 7" />}
                        {pos === 6 && <path d="M1 7L7 1M7 7H1V1" />}
                        {pos === 7 && <path d="M4 1V7M1 4L4 7L7 4" />}
                        {pos === 8 && <path d="M1 1L7 7M7 1V7H1" />}
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {showShadowColorPicker && (
        <ColorPicker
          color={shadowColor}
          opacity={shadowOpacity}
          onChange={(color, opacity) => {
            setShadowColor(color);
            setShadowOpacity(opacity);
          }}
          onClose={() => setShowShadowColorPicker(false)}
        />
      )}
    </section>
  );
};
