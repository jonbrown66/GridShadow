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
    borderOptions[selectedBorder]?.borderRadiusClass ?? "rounded-sm";

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
    <main className="flex flex-1 items-center justify-center p-8 bg-background relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none mix-blend-overlay"></div>

      <div
        className="relative flex items-center justify-center rounded-none border border-black/5 dark:border-white/5 bg-background shadow-md dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] z-10 overflow-hidden"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        <div
          className="absolute inset-0 m-4 rounded-none transition-colors border border-black/5 dark:border-white/5"
          style={{ background: backgroundStyle }}
        />

        {layout ? (
          <div className="relative z-10 h-full w-full p-8 pt-10">
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
                    className={`relative group flex items-center justify-center transition-all ${image
                      ? "border-transparent"
                      : "border border-dashed border-black/20 dark:border-[#333] bg-white/80 dark:bg-[#161616] hover:bg-white dark:hover:bg-[#1f1f1f] hover:border-primary/50 backdrop-blur-md"
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
                          className={`h-full w-full object-cover border border-black/10 dark:border-white/10 ${borderClass}`}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 rounded-none bg-background/80 border border-black/20 dark:border-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-foreground shadow-sm dark:shadow-2xl opacity-0 hover:bg-primary hover:text-primary-foreground group-hover:opacity-100 transition-all duration-200"
                          onClick={(event) => {
                            event.stopPropagation();
                            onClearImage(index);
                          }}
                        >
                          Clear
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-4 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                        <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/10 text-muted-foreground group-hover:border-primary group-hover:text-primary transition-all group-hover:scale-110 shadow-[0_0_30px_rgba(202,252,0,0)] group-hover:shadow-[0_0_30px_rgba(202,252,0,0.2)]">
                          <svg
                            width="20"
                            height="20"
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
                        <div className="text-center font-mono">
                          <span className="font-bold text-foreground uppercase tracking-wider block mb-1">
                            Load Asset
                          </span>
                          <span className="text-[10px] uppercase tracking-[0.2em] opacity-50">
                            Slot {index + 1}
                          </span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-12 rounded-sm border border-dashed border-black/20 dark:border-white/20 bg-white/80 dark:bg-black/60 backdrop-blur-md">
            <p className="font-bold text-xl text-foreground font-display uppercase tracking-wider mb-2">
              System Pending
            </p>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
              Select layout configuration from sidebar
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
