import * as React from "react";

interface ColorPickerProps {
  color: string;
  opacity: number;
  onChange: (color: string, opacity: number) => void;
  onClose: () => void;
}

export const ColorPicker = ({
  color,
  opacity,
  onChange,
  onClose,
}: ColorPickerProps): JSX.Element => {
  const [hue, setHue] = React.useState(0);
  const [saturation, setSaturation] = React.useState(100);
  const [lightness, setLightness] = React.useState(50);
  const [localOpacity, setLocalOpacity] = React.useState(opacity);

  React.useEffect(() => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    let h = 0;
    let s = 0;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    setHue(Math.round(h * 360));
    setSaturation(Math.round(s * 100));
    setLightness(Math.round(l * 100));
  }, [color]);

  const hslToHex = (h: number, s: number, l: number): string => {
    const hDecimal = h / 360;
    const sDecimal = s / 100;
    const lDecimal = l / 100;

    let r: number;
    let g: number;
    let b: number;

    if (sDecimal === 0) {
      r = g = b = lDecimal;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q =
        lDecimal < 0.5
          ? lDecimal * (1 + sDecimal)
          : lDecimal + sDecimal - lDecimal * sDecimal;
      const p = 2 * lDecimal - q;

      r = hue2rgb(p, q, hDecimal + 1 / 3);
      g = hue2rgb(p, q, hDecimal);
      b = hue2rgb(p, q, hDecimal - 1 / 3);
    }

    const toHex = (x: number) => {
      const hexValue = Math.round(x * 255).toString(16);
      return hexValue.length === 1 ? `0${hexValue}` : hexValue;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const handleHueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(event.target.value);
    setHue(newHue);
    const newColor = hslToHex(newHue, saturation, lightness);
    onChange(newColor, localOpacity);
  };

  const handleSaturationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newSat = parseInt(event.target.value);
    setSaturation(newSat);
    const newColor = hslToHex(hue, newSat, lightness);
    onChange(newColor, localOpacity);
  };

  const handleLightnessChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newLight = parseInt(event.target.value);
    setLightness(newLight);
    const newColor = hslToHex(hue, saturation, newLight);
    onChange(newColor, localOpacity);
  };

  const handleOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newOpacity = parseInt(event.target.value);
    setLocalOpacity(newOpacity);
    onChange(color, newOpacity);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black/80 backdrop-blur-sm">
      <div className="w-[320px] rounded-none bg-background border border-black/10 dark:border-white/10 p-6 shadow-lg dark:shadow-2xl font-mono">
        <div className="mb-6 flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Color Engine</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground transition-colors hover:text-foreground font-bold"
            aria-label="Close color picker"
          >
            [X]
          </button>
        </div>

        <div className="space-y-6 text-sm text-muted-foreground">
          <div
            className="h-24 w-full rounded-sm border border-black/20 dark:border-white/20 relative overflow-hidden"
          >
            <div className="absolute inset-0 technical-grid opacity-30 mix-blend-overlay"></div>
            <div className="absolute inset-0" style={{
              backgroundColor: `${color}${Math.round(localOpacity * 2.55)
                .toString(16)
                .padStart(2, "0")}`,
            }}></div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] uppercase font-bold text-foreground tracking-widest">
                  Hue
                </label>
                <span className="text-[10px]">{hue}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={handleHueChange}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white"
                style={{
                  background: `linear-gradient(to right,
                    hsl(0, 100%, 50%),
                    hsl(60, 100%, 50%),
                    hsl(120, 100%, 50%),
                    hsl(180, 100%, 50%),
                    hsl(240, 100%, 50%),
                    hsl(300, 100%, 50%),
                    hsl(360, 100%, 50%))`,
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] uppercase font-bold text-foreground tracking-widest">
                  Saturation
                </label>
                <span className="text-[10px]">{saturation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={saturation}
                onChange={handleSaturationChange}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white"
                style={{
                  background: `linear-gradient(to right,
                    hsl(${hue}, 0%, ${lightness}%),
                    hsl(${hue}, 100%, ${lightness}%))`,
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] uppercase font-bold text-foreground tracking-widest">
                  Lightness
                </label>
                <span className="text-[10px]">{lightness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={lightness}
                onChange={handleLightnessChange}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white"
                style={{
                  background: `linear-gradient(to right,
                    hsl(${hue}, ${saturation}%, 0%),
                    hsl(${hue}, ${saturation}%, 50%),
                    hsl(${hue}, ${saturation}%, 100%))`,
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] uppercase font-bold text-foreground tracking-widest">
                  Alpha
                </label>
                <span className="text-[10px]">{localOpacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={localOpacity}
                onChange={handleOpacityChange}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-none bg-black/20 dark:bg-white/20 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 text-xs">
            <span className="font-bold text-foreground uppercase tracking-widest text-[10px]">Hex.</span>
            <input
              type="text"
              value={color}
              readOnly
              className="flex-1 rounded-sm bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 px-3 py-2 font-mono text-foreground text-xs uppercase focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
