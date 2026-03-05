import { ScrollArea } from "../shared/ui/scroll-area";
import { Separator } from "../shared/ui/separator";
import { useMockupSettings } from "../features/mockup/model/useMockupSettings";
import { useImageProcessing } from "../features/mockup/services/useImageProcessing";
import { BackgroundSettings } from "../features/mockup/ui/BackgroundSettings";
import { ShadowSettings } from "../features/mockup/ui/ShadowSettings";
import { BorderSettings } from "../features/mockup/ui/BorderSettings";
import { ImageUploadArea } from "../features/mockup/ui/ImageUploadArea";
import { DownloadSection } from "../features/mockup/ui/DownloadSection";
import { LayoutSettings } from "../features/mockup/ui/LayoutSettings";
import { ImageSizeSettings } from "../features/mockup/ui/ImageSizeSettings";

export const MockupPage = (): JSX.Element => {
  const {
    backgroundColor,
    setBackgroundColor,
    backgroundOpacity,
    setBackgroundOpacity,
    showBgColorPicker,
    setShowBgColorPicker,
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
    selectedBorder,
    setSelectedBorder,
    uploadedImage,
    setUploadedImage,
    downloadResolution,
    setDownloadResolution,
    showResolutionMenu,
    setShowResolutionMenu,
    layoutRatio,
    setLayoutRatio,
    imageSize,
    setImageSize,
    bgColorWithOpacity,
    bgR,
    bgG,
    bgB,
    bgOpacityDecimal,
    getShadowStyle,
  } = useMockupSettings();

  const { handleImageUpload, handleDownload } = useImageProcessing({
    uploadedImage,
    setUploadedImage,
    downloadResolution,
    layoutRatio,
    imageSize,
    bgR,
    bgG,
    bgB,
    bgOpacityDecimal,
    selectedBorder,
    selectedShadow,
    shadowColor,
    shadowOpacity,
    shadowPosition,
  });

  return (
    <div className="flex flex-1 h-full min-h-0 overflow-hidden bg-background">
      <aside className="w-80 lg:w-96 bg-black/5 dark:bg-white/5 border-r border-black/10 dark:border-white/10 flex flex-col h-full min-h-0 relative font-mono text-sm">
        <ScrollArea className="flex-1 h-full overflow-y-auto">
          <div className="p-6 space-y-8">
            <LayoutSettings
              layoutRatio={layoutRatio}
              setLayoutRatio={setLayoutRatio}
            />
            <BackgroundSettings
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
              backgroundOpacity={backgroundOpacity}
              setBackgroundOpacity={setBackgroundOpacity}
              showBgColorPicker={showBgColorPicker}
              setShowBgColorPicker={setShowBgColorPicker}
              bgColorWithOpacity={bgColorWithOpacity}
            />
            <ShadowSettings
              selectedShadow={selectedShadow}
              setSelectedShadow={setSelectedShadow}
              shadowColor={shadowColor}
              setShadowColor={setShadowColor}
              shadowOpacity={shadowOpacity}
              setShadowOpacity={setShadowOpacity}
              shadowPosition={shadowPosition}
              setShadowPosition={setShadowPosition}
              showShadowColorPicker={showShadowColorPicker}
              setShowShadowColorPicker={setShowShadowColorPicker}
            />
            <BorderSettings
              selectedBorder={selectedBorder}
              setSelectedBorder={setSelectedBorder}
            />
            <ImageSizeSettings imageSize={imageSize} setImageSize={setImageSize} />
          </div>
        </ScrollArea>

        <Separator className="bg-black/10 dark:bg-white/10" />

        <DownloadSection
          downloadResolution={downloadResolution}
          setDownloadResolution={setDownloadResolution}
          showResolutionMenu={showResolutionMenu}
          setShowResolutionMenu={setShowResolutionMenu}
          handleDownload={handleDownload}
        />
      </aside>

      <ImageUploadArea
        uploadedImage={uploadedImage}
        handleImageUpload={handleImageUpload}
        selectedBorder={selectedBorder}
        getShadowStyle={getShadowStyle}
        imageSize={imageSize}
        layoutRatio={layoutRatio}
        bgR={bgR}
        bgG={bgG}
        bgB={bgB}
        bgOpacityDecimal={bgOpacityDecimal}
      />
    </div>
  );
};
