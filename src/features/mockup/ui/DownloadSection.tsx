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
    <div className="flex items-center justify-center p-4">
      <Button
        className="h-11 flex-1 bg-[#cafc00] rounded-l-lg border border-gray-200 hover:bg-[#cafc00]/90"
        onClick={handleDownload}
      >
        <img className="w-5 h-5 mr-2" alt="Image" src="/image-1.svg" />
        <span className="font-medium text-gray-900 text-sm">Download PNG</span>
        <span className="font-medium text-gray-900 text-xs ml-1">
          {downloadResolution}
        </span>
      </Button>
      <div className="relative">
        <button
          onClick={() => setShowResolutionMenu(!showResolutionMenu)}
          className="h-11 w-10 bg-[#cafc00] border border-l-0 border-gray-200 rounded-r-lg flex items-center justify-center hover:bg-[#cafc00]/90"
        >
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="#2a2b34"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {showResolutionMenu && (
          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
            {resolutionOptions.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setDownloadResolution(key);
                  setShowResolutionMenu(false);
                }}
                className={`w-full px-4 py-2 text-left text-sm font-medium hover:bg-gray-100 ${
                  downloadResolution === key
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
