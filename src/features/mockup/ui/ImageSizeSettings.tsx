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
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-primary"></div>
        <h2 className="font-bold text-foreground text-[10px] tracking-[0.2em] uppercase font-mono">
          Scale
        </h2>
      </div>
      <Card className="border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 rounded-sm">
        <CardContent className="p-5">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-3 font-mono">
                <span className="font-bold text-foreground text-xs uppercase tracking-wider">Scale Factor</span>
                <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-sm border border-primary/20">{imageSize}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                value={imageSize}
                onChange={(e) => setImageSize(parseInt(e.target.value))}
                className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
