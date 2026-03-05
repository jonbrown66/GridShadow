import React from "react";
import { Button } from "../../../shared/ui/button";
import {
  resolutionOptions,
  type ResolutionPresetKey,
} from "../config/presets";

interface DownloadSectionProps {
  downloadResolution: ResolutionPresetKey;
  setDownloadResolution: (resolution: ResolutionPresetKey) => void;
  showResolutionMenu: boolean;
  setShowResolutionMenu: (show: boolean) => void;
  handleDownload: () => Promise<void>;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({
  downloadResolution,
  setDownloadResolution,
  showResolutionMenu,
  setShowResolutionMenu,
  handleDownload,
}) => {
  return (
    <div className="flex items-center justify-center p-6">
      <Button
        className="h-12 flex-1 bg-primary rounded-l-sm rounded-r-none border border-primary hover:bg-transparent hover:text-primary transition-all text-primary-foreground group"
        onClick={handleDownload}
      >
        <span className="font-bold text-xs uppercase tracking-wider font-mono">Render PNG</span>
        <span className="font-bold text-[10px] ml-2 px-1.5 py-0.5 bg-background/20 group-hover:bg-primary/20 rounded-sm">
          {downloadResolution}
        </span>
      </Button>
      <div className="relative">
        <button
          onClick={() => setShowResolutionMenu(!showResolutionMenu)}
          className="h-12 w-10 bg-primary border border-l-0 border-primary rounded-r-sm rounded-l-none flex items-center justify-center hover:bg-transparent hover:text-primary text-primary-foreground transition-all"
        >
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="square"
            />
          </svg>
        </button>
        {showResolutionMenu && (
          <div className="absolute bottom-full right-0 mb-2 w-48 bg-background rounded-sm shadow-lg dark:shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden z-50">
            {resolutionOptions.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setDownloadResolution(key);
                  setShowResolutionMenu(false);
                }}
                className={`w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-widest font-mono flex items-center justify-between transition-colors ${downloadResolution === key
                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:bg-black/5 dark:bg-white/5 hover:text-foreground border-l-2 border-transparent"
                  }`}
              >
                {label}
                {downloadResolution === key && <span className="w-1.5 h-1.5 bg-primary rounded-none"></span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
