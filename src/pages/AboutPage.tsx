import { ScrollArea } from "../shared/ui/scroll-area";

export const AboutPage = (): JSX.Element => {
  return (
    <div className="flex flex-1 h-full min-h-0 overflow-hidden bg-background relative">
      <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none mix-blend-overlay"></div>
      <ScrollArea className="flex-1 h-full relative z-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 lg:px-16 font-mono">
          <header className="space-y-6 border-l-2 border-primary pl-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">
              System Specification
            </p>
            <h1 className="text-4xl font-extrabold text-foreground lg:text-5xl font-display uppercase tracking-tighter leading-[1.1]">
              GridShadow <br /> Visual Studio.
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground w-3/4">
              We are a builder-friendly tool that helps marketing and product
              teams compose screenshot walls, packshots, and layered moodboards
              in seconds. Think of it as a grid-aware workspace where spacing,
              shadows, and exports stay perfectly aligned.
            </p>
          </header>

          <section className="grid gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 lg:grid-cols-2">
            <div className="bg-background p-10 group hover:bg-black/5 dark:bg-white/5 transition-colors">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground flex items-center gap-3 mb-8">
                <span className="w-1.5 h-1.5 bg-primary"></span>
                Output Capabilities
              </p>
              <ul className="space-y-px bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 w-full text-xs text-muted-foreground">
                <li className="bg-background p-5 hover:text-foreground transition-colors border-l-2 border-transparent hover:border-primary">
                  <span className="font-bold text-foreground uppercase tracking-wider">Mockup</span>{" "}
                  — polish a single screenshot with responsive backgrounds,
                  borders, and export-ready ratios.
                </li>
                <li className="bg-background p-5 hover:text-foreground transition-colors border-l-2 border-transparent hover:border-primary">
                  <span className="font-bold text-foreground uppercase tracking-wider">Frame</span> —
                  bring up to nine images into curated grids with zero white
                  gaps and one-click download.
                </li>
                <li className="bg-background p-5 hover:text-foreground transition-colors border-l-2 border-transparent hover:border-primary">
                  Share-ready hero assets with consistent glow, depth, and brand
                  panels.
                </li>
              </ul>
            </div>

            <div className="bg-background p-10 group hover:bg-black/5 dark:bg-white/5 transition-colors">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground flex items-center gap-3 mb-8">
                <span className="w-1.5 h-1.5 bg-primary"></span>
                Design Principles
              </p>
              <ul className="space-y-4 text-xs text-muted-foreground leading-relaxed border-l border-black/10 dark:border-white/10 pl-6">
                <li className="flex gap-4">
                  <span className="text-primary mt-0.5">01</span>
                  <span>Precision grids instead of freehand dragging.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary mt-0.5">02</span>
                  <span>Export parity — canvas and download always match.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary mt-0.5">03</span>
                  <span>Lightweight stack with predictable keyboard-first flow.</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="grid gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 lg:grid-cols-2">
            <div className="bg-background p-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground flex items-center gap-3 mb-10 relative z-10">
                <span className="w-1.5 h-1.5 bg-primary"></span>
                Metrics
              </p>
              <div className="grid gap-10 text-xs text-muted-foreground relative z-10">
                <div className="border-b border-black/10 dark:border-white/10 pb-6 flex items-end justify-between">
                  <p className="uppercase tracking-widest w-1/2">Curated Grid Archetypes</p>
                  <p className="text-6xl font-extrabold text-foreground font-display leading-none">9</p>
                </div>
                <div className="border-b border-black/10 dark:border-white/10 pb-6 flex items-end justify-between">
                  <p className="uppercase tracking-widest w-1/2">Export Combinations</p>
                  <p className="text-6xl font-extrabold text-foreground font-display leading-none">∞</p>
                </div>
                <div className="flex items-end justify-between">
                  <p className="uppercase tracking-widest w-1/2">Focused Core Tools</p>
                  <p className="text-6xl font-extrabold text-foreground font-display leading-none text-primary">2</p>
                </div>
              </div>
            </div>

            <div className="bg-background p-10 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground flex items-center gap-3 mb-8">
                  <span className="w-1.5 h-1.5 bg-primary animate-pulse"></span>
                  Roadmap & Contact
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Next up: collaborative presets, branded typography layers, and a
                  collection of ready-made marketing frames.
                </p>
              </div>

              <div className="mt-12 p-6 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Direct Channel</p>
                <a
                  className="inline-flex items-center justify-between w-full font-bold text-foreground text-sm uppercase tracking-wider group"
                  href="mailto:hello@gridshadow.app"
                >
                  hello@gridshadow.app
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0">-&gt;</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};
