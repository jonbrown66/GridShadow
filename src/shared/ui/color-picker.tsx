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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-[320px] rounded-2xl bg-white p-6 shadow-2xl shadow-black/10 font-sans">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Color Picker</h3>
          <button
            onClick={onClose}
            className="text-base text-gray-400 transition-colors hover:text-gray-700"
            aria-label="Close color picker"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 text-sm text-gray-600">
          <div
            className="h-24 w-full rounded-lg border-2 border-dashed border-black/10"
            style={{
              backgroundColor: `${color}${Math.round(localOpacity * 2.55)
                .toString(16)
                .padStart(2, "0")}`,
            }}
          />

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-medium text-gray-700">
                Hue: {hue}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={handleHueChange}
                className="h-2 w-full cursor-pointer appearance-none rounded-full"
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
              <label className="font-medium text-gray-700">
                Saturation: {saturation}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={saturation}
                onChange={handleSaturationChange}
                className="h-2 w-full cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(to right,
                    hsl(${hue}, 0%, ${lightness}%),
                    hsl(${hue}, 100%, ${lightness}%))`,
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-700">
                Lightness: {lightness}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={lightness}
                onChange={handleLightnessChange}
                className="h-2 w-full cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(to right,
                    hsl(${hue}, ${saturation}%, 0%),
                    hsl(${hue}, ${saturation}%, 50%),
                    hsl(${hue}, ${saturation}%, 100%))`,
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-700">
                Opacity: {localOpacity}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={localOpacity}
                onChange={handleOpacityChange}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 text-sm text-gray-600">
            <span className="font-medium text-gray-700">Hex:</span>
            <input
              type="text"
              value={color}
              readOnly
              className="w-0 flex-1 truncate rounded-md border border-gray-200 px-3 py-2 font-mono text-sm text-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
