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
    borderOptions[selectedBorder]?.borderRadiusClass ?? "rounded-lg";

  return (
    <main className="flex flex-1 items-center justify-center p-8 bg-gray-100">
      <div
        role="button"
        tabIndex={0}
        className="relative flex items-center justify-center rounded-xl overflow-hidden bg-white border-2 border-gray-300 focus:outline-none focus-visible:border-purple-400"
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
          className="absolute inset-0 m-2 rounded-xl"
          style={{
            backgroundColor: `rgba(${bgR}, ${bgG}, ${bgB}, ${bgOpacityDecimal})`,
          }}
        />

        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt="Uploaded preview"
            className={`object-contain z-10 ${borderClass}`}
            style={{
              boxShadow: getShadowStyle(),
              maxWidth: `calc(${imageSize}% - 40px)`,
              maxHeight: `calc(${imageSize}% - 40px)`,
            }}
          />
        ) : (
          <div className="z-10 flex flex-col items-center justify-center gap-4 text-gray-600">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-500 shadow-inner">
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
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-gray-900">
                Click to upload
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Drop PNG, JPG, or WebP files into this canvas
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
