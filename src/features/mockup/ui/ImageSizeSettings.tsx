import React from "react";
import { Card, CardContent } from "../../../shared/ui/card";

interface ImageSizeSettingsProps {
  imageSize: number;
  setImageSize: (size: number) => void;
}

export const ImageSizeSettings: React.FC<ImageSizeSettingsProps> = ({
  imageSize,
  setImageSize,
}) => {
  return (
    <section>
      <h2 className="mb-4 font-medium text-gray-500 text-xs tracking-wide uppercase">
        IMG SIZE
      </h2>
      <Card className="border border-gray-200">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700 text-sm">Size</span>
                <span className="text-sm text-gray-500">{imageSize}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                value={imageSize}
                onChange={(e) => setImageSize(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
