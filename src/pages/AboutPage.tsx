import { ScrollArea } from "../shared/ui/scroll-area";

export const AboutPage = (): JSX.Element => {
  return (
    <div className="flex flex-1 h-full min-h-0 overflow-hidden bg-gray-50">
      <ScrollArea className="flex-1 h-full">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12 lg:px-16">
          <header className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-gray-500">
              About
            </p>
            <h1 className="text-3xl font-semibold text-gray-900 lg:text-4xl">
              GridShadow is a layout-first visual studio for crisp mockups.
            </h1>
            <p className="text-base leading-relaxed text-gray-600">
              We are a builder-friendly tool that helps marketing and product
              teams compose screenshot walls, packshots, and layered moodboards
              in seconds. Think of it as a grid-aware workspace where spacing,
              shadows, and exports stay perfectly aligned.
            </p>
          </header>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-white bg-white/80 p-6 shadow-sm shadow-black/5">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
                What you can craft
              </p>
              <ul className="mt-4 space-y-4 text-sm text-gray-600">
                <li className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
                  <span className="font-semibold text-gray-900">Mockup</span>{" "}
                  — polish a single screenshot with responsive backgrounds,
                  borders, and export-ready ratios.
                </li>
                <li className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
                  <span className="font-semibold text-gray-900">Frame</span> —
                  bring up to nine images into curated grids with zero white
                  gaps and one-click download.
                </li>
                <li className="rounded-2xl border border-gray-200 bg-gray-50/60 p-4">
                  Share-ready hero assets with consistent glow, depth, and brand
                  panels.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white bg-white/80 p-6 shadow-sm shadow-black/5">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
                Principles
              </p>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>• Precision grids instead of freehand dragging.</li>
                <li>• Export parity — canvas and download always match.</li>
                <li>• Lightweight stack with predictable keyboard-first flow.</li>
              </ul>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-white bg-gradient-to-br from-white via-[#f7f9ff] to-[#fff8ed] p-6 shadow-inner">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
                Snapshot
              </p>
              <div className="mt-6 grid gap-6 text-sm text-gray-700">
                <div>
                  <p className="text-4xl font-semibold text-gray-900">9</p>
                  <p>curated grid archetypes</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold text-gray-900">∞</p>
                  <p>export combinations across ratios and shadows</p>
                </div>
                <div>
                  <p className="text-4xl font-semibold text-gray-900">2</p>
                  <p>focused tools — Mockup & Frame</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white bg-white p-6 shadow-sm shadow-black/5">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
                Roadmap & contact
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Next up: collaborative presets, branded typography layers, and a
                collection of ready-made marketing frames. Talk to us at{" "}
                <a
                  className="font-medium text-gray-900 underline decoration-dotted"
                  href="mailto:hello@gridshadow.app"
                >
                  hello@gridshadow.app
                </a>{" "}
                if you want early access or have layout ideas.
              </p>
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};
