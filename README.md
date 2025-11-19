# GridShadow

GridShadow is a layout-first mockup studio that helps you craft screenshot compositions, packshots, and layered moodboards in seconds. It focuses on two workflows:

- **Mockup** – polish a single screenshot with responsive backgrounds, borders, shadows, ratios, and high-res export.
- **Frame** – arrange up to nine assets into curated grids with zero white gaps, consistent spacing, and one-click export.

Both experiences run in the browser, powered by React, TypeScript, Vite, and Tailwind CSS.

## ✨ Features

### Mockup
- **Upload & live preview** — drag-and-drop or click to add PNG/JPG/WebP files and preview changes immediately.
- **Background lab** — pick colors, tweak opacity, and preview overlays directly on the canvas.
- **Shadow designer** — choose templates or fine-tune color, opacity, and offset via a 3×3 selector.
- **Border & sizing tools** — switch between sharp, curved, or round corners and scale the hero image precisely.
- **Export presets** — 720p, 1080p, 2K and more, rendered via canvas for pixel-perfect PNGs.

### Frame
- **Image count selector** — choose 1–9 images and get matching templates instantly.
- **Curated grids** — spotlight towers, banner heroes, honeycomb stacks, weave matrices, and other asymmetric layouts.
- **Slot-aware uploads** — each slot has its own “Upload image” CTA and quick-clear chip.
- **Shared styling** — reuse Mockup background, border, and shadow settings across the entire grid.
- **One-click download** — same export pipeline as Mockup, ensuring the canvas matches the output.

## 🧱 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build tool**: Vite 6
- **Styling**: Tailwind CSS + shadcn/ui (Radix primitives)
- **State & hooks**: Lightweight custom hooks per feature
- **Canvas export**: Native Canvas API with custom rounding/shadow helpers

## 🚀 Getting Started

```bash
git clone <repository-url>
cd screenshotfix

npm install         # or: yarn install / pnpm install
npm run dev         # starts Vite dev server on http://localhost:5173
```

### Useful scripts

```bash
npm run dev         # local development with hot reload
npm run build       # production build (outputs to dist/)
npm run preview     # preview production bundle locally
```

## 📁 Project Structure

```
src/
├─ app/             # app-wide config & layout
├─ features/
│  ├─ mockup        # background/shadow/border tooling
│  └─ frame         # grid composer + export service
├─ pages/           # routed pages (Mockup, Frame, About)
├─ shared/          # shared UI primitives (button, color picker, etc.)
└─ index.tsx        # React entry
```

## 🧩 Development Notes

- Prefer the `useMockupSettings` and `useFrameComposer` hooks to access or extend UI state.
- When adding new layout templates, extend `src/features/frame/config/frameLayouts.ts` so both preview and export stay in sync.
- Keep brand assets (e.g., `GridShadow.png`) under `public/` for zero-config hosting.

## 🤝 Contribution

1. Fork the repo and create a feature branch.
2. Run `npm run dev`, make your updates, and ensure `npm run build` succeeds.
3. Open a pull request describing the change and screenshots if UI-related.

## 📜 License

MIT. See [LICENSE](LICENSE) for details.

## 📬 Contact

- Email: [hello@gridshadow.app](mailto:hello@gridshadow.app)
- Issues & feature requests: please open a ticket in this repository.

Enjoy composing with GridShadow!
