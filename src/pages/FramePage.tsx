import { ScrollArea } from "../shared/ui/scroll-area";
import { Separator } from "../shared/ui/separator";
import { LayoutSettings } from "../features/mockup/ui/LayoutSettings";
import { FrameBackgroundSettings } from "../features/frame/ui/FrameBackgroundSettings";
import { ShadowSettings } from "../features/mockup/ui/ShadowSettings";
import { BorderSettings } from "../features/mockup/ui/BorderSettings";
import { DownloadSection } from "../features/mockup/ui/DownloadSection";
import { useFrameComposer } from "../features/frame/model/useFrameComposer";
import { FrameImageCountSelector } from "../features/frame/ui/FrameImageCountSelector";
import { FrameLayoutPicker } from "../features/frame/ui/FrameLayoutPicker";
import { FramePreview } from "../features/frame/ui/FramePreview";
import { useFrameExport } from "../features/frame/services/useFrameExport";

export const FramePage = (): JSX.Element => {
  const frame = useFrameComposer();
  const { handleDownload } = useFrameExport({
    uploadedImages: frame.uploadedImages,
    layout: frame.selectedLayout,
    layoutRatio: frame.layoutRatio,
    selectedBorder: frame.selectedBorder,
    selectedShadow: frame.selectedShadow,
    shadowColor: frame.shadowColor,
    shadowOpacity: frame.shadowOpacity,
    shadowPosition: frame.shadowPosition,
    downloadResolution: frame.downloadResolution,
    backgroundFill: frame.backgroundFill,
  });

  return (
    <div className="flex flex-1 h-full min-h-0 overflow-hidden">
      <aside className="w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col h-full min-h-0">
        <ScrollArea className="flex-1 h-full overflow-y-auto">
          <div className="p-6 space-y-6">
            <LayoutSettings
              layoutRatio={frame.layoutRatio}
              setLayoutRatio={frame.setLayoutRatio}
            />
            <FrameImageCountSelector
              value={frame.imageCount}
              onChange={frame.setImageCount}
            />
            <FrameLayoutPicker
              options={frame.layoutPresets}
              selectedId={frame.selectedLayoutId}
              onSelect={frame.setSelectedLayoutId}
            />
            <FrameBackgroundSettings
              backgroundColor={frame.backgroundColor}
              setBackgroundColor={frame.setBackgroundColor}
              backgroundOpacity={frame.backgroundOpacity}
              setBackgroundOpacity={frame.setBackgroundOpacity}
              showBgColorPicker={frame.showBgColorPicker}
              setShowBgColorPicker={frame.setShowBgColorPicker}
              bgColorWithOpacity={frame.bgColorWithOpacity}
              backgroundPresetId={frame.backgroundPresetId}
              selectBackgroundPreset={frame.selectBackgroundPreset}
            />
            <ShadowSettings
              selectedShadow={frame.selectedShadow}
              setSelectedShadow={frame.setSelectedShadow}
              shadowColor={frame.shadowColor}
              setShadowColor={frame.setShadowColor}
              shadowOpacity={frame.shadowOpacity}
              setShadowOpacity={frame.setShadowOpacity}
              shadowPosition={frame.shadowPosition}
              setShadowPosition={frame.setShadowPosition}
              showShadowColorPicker={frame.showShadowColorPicker}
              setShowShadowColorPicker={frame.setShowShadowColorPicker}
            />
            <BorderSettings
              selectedBorder={frame.selectedBorder}
              setSelectedBorder={frame.setSelectedBorder}
            />
          </div>
        </ScrollArea>

        <Separator className="bg-gray-200" />
        <DownloadSection
          downloadResolution={frame.downloadResolution}
          setDownloadResolution={frame.setDownloadResolution}
          showResolutionMenu={frame.showResolutionMenu}
          setShowResolutionMenu={frame.setShowResolutionMenu}
          handleDownload={handleDownload}
        />
      </aside>

      <FramePreview
        layoutRatio={frame.layoutRatio}
        backgroundStyle={frame.backgroundStyle}
        selectedBorder={frame.selectedBorder}
        getShadowStyle={frame.getShadowStyle}
        layout={frame.selectedLayout}
        images={frame.uploadedImages}
        onUploadImage={frame.handleSlotUpload}
        onClearImage={frame.handleClearSlot}
      />
    </div>
  );
};
