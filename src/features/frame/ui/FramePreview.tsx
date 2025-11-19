import React from "react";
import { borderOptions } from "../../mockup/config/presets";
import { layoutDimensions } from "../../mockup/config/layoutDimensions";
import { type FrameLayoutOption } from "../config/frameLayouts";

interface FramePreviewProps {
  layoutRatio: string;
  backgroundStyle: string;
  selectedBorder: number;
  getShadowStyle: () => string;
  layout: FrameLayoutOption | null;
  images: (string | null)[];
  onUploadImage: (slotIndex: number, file: File) => void;
  onClearImage: (slotIndex: number) => void;
}

export const FramePreview: React.FC<FramePreviewProps> = ({
  layoutRatio,
  backgroundStyle,
  selectedBorder,
  getShadowStyle,
  layout,
  images,
  onUploadImage,
  onClearImage,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [activeSlot, setActiveSlot] = React.useState<number | null>(null);

  const dimensions =
    layoutDimensions[layoutRatio] ?? layoutDimensions["16:9"];

  const borderClass =
    borderOptions[selectedBorder]?.borderRadiusClass ?? "rounded-lg";

  const handleTriggerUpload = (slotIndex: number) => {
    setActiveSlot(slotIndex);
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && activeSlot !== null) {
      onUploadImage(activeSlot, file);
    }
    event.target.value = "";
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-gray-100 p-8 min-h-0">
      <div
        className="relative flex items-center justify-center rounded-xl border-2 border-gray-200 bg-white shadow-sm"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <div
          className="absolute inset-0 m-2 rounded-xl"
          style={{ background: backgroundStyle }}
        />

        {layout ? (
          <div className="relative z-10 h-full w-full p-6">
            <div
              className="grid h-full w-full"
              style={{
                gridTemplateColumns: layout.columns,
                gridTemplateRows: layout.rows,
                gap: layout.gap,
              }}
            >
              {layout.slots.map((slot, index) => {
                const image = images[index] ?? null;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    className={`relative group flex items-center justify-center border bg-white/80 transition-all ${
                      image
                        ? "border-transparent shadow-md"
                        : "border-dashed border-gray-300 hover:border-purple-400"
                    } ${borderClass} overflow-hidden`}
                    style={{
                      gridColumn: slot.gridColumn,
                      gridRow: slot.gridRow,
                      boxShadow: image ? getShadowStyle() : "none",
                    }}
                    onClick={() => handleTriggerUpload(index)}
                  >
                    {image ? (
                      <>
                        <img
                          src={image}
                          alt={`Uploaded image ${index + 1}`}
                          className={`h-full w-full object-cover ${borderClass}`}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-gray-700 shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={(event) => {
                            event.stopPropagation();
                            onClearImage(index);
                          }}
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-xs text-gray-600">
                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white text-gray-400">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 4v16M4 12h16"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-800">
                          Upload image
                        </span>
                        <span className="text-[11px] uppercase tracking-wide text-gray-400">
                          Slot {index + 1}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center text-gray-500">
            <p className="font-medium text-gray-900">
              Choose a frame layout to get started
            </p>
            <p className="text-sm text-gray-500">
              Select an image count and layout on the left panel
            </p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </main>
  );
};
