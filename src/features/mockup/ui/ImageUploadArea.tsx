import React from "react";
import { borderOptions } from "../config/presets";
import { layoutDimensions } from "../config/layoutDimensions";

interface ImageUploadAreaProps {
  uploadedImage: string | null;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedBorder: number;
  getShadowStyle: () => string;
  imageSize: number;
  layoutRatio: string;
  bgR: number;
  bgG: number;
  bgB: number;
  bgOpacityDecimal: number;
}

export const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({
  uploadedImage,
  handleImageUpload,
  selectedBorder,
  getShadowStyle,
  imageSize,
  layoutRatio,
  bgR,
  bgG,
  bgB,
  bgOpacityDecimal,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { width, height } = layoutDimensions[layoutRatio] || {
    width: 700,
    height: 700,
  };

  const handleTriggerUpload = () => inputRef.current?.click();

  const borderClass =
    borderOptions[selectedBorder]?.borderRadiusClass ?? "rounded-sm";

  return (
    <main className="flex flex-1 items-center justify-center p-8 bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none mix-blend-overlay"></div>

      <div
        role="button"
        tabIndex={0}
        className="relative flex items-center justify-center rounded-none overflow-hidden bg-background border border-black/5 dark:border-white/5 focus:outline-none focus-visible:border-primary group/canvas shadow-md dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] z-10"
        style={{ width, height }}
        onClick={handleTriggerUpload}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleTriggerUpload();
          }
        }}
      >
        <div
          className="absolute inset-0 m-4 rounded-none transition-colors border border-black/5 dark:border-white/5"
          style={{
            backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, ${bgOpacityDecimal})`,
          }}
        />

        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt="Uploaded preview"
            className={`object-contain z-10 transition-transform duration-500 hover:scale-[1.02] ${borderClass} border border-black/10 dark:border-white/10`}
            style={{
              boxShadow: getShadowStyle(),
              maxWidth: `calc(${imageSize}% - 40px)`,
              maxHeight: `calc(${imageSize}% - 40px)`,
            }}
          />
        ) : (
          <div className="z-10 flex flex-col items-center justify-center gap-6 p-12 text-center rounded-sm border border-dashed border-black/20 dark:border-[#333] bg-white/80 dark:bg-[#161616] group-hover/canvas:border-primary/50 group-hover/canvas:bg-white dark:group-hover/canvas:bg-[#1f1f1f] transition-all cursor-pointer shadow-sm dark:shadow-2xl">
            <div className="flex w-16 h-16 items-center justify-center rounded-sm bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-muted-foreground group-hover/canvas:border-primary group-hover/canvas:text-primary transition-all group-hover/canvas:scale-110 shadow-[0_0_30px_rgba(202,252,0,0)] group-hover/canvas:shadow-[0_0_30px_rgba(202,252,0,0.2)]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground tracking-tight font-display uppercase">
                Initialize Content
              </p>
              <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-[0.2em] font-mono">
                Click or drop asset here
              </p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </main>
  );
};
