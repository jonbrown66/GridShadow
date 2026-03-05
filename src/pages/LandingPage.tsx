import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../app/theme/ThemeProvider";
import {
    Image as ImageIcon,
    Combine,
    Layers,
    Monitor,
    ShieldCheck,
    Download
} from "lucide-react";

export const LandingPage: React.FC = () => {
    const { theme } = useTheme();

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background selection:bg-primary selection:text-primary-foreground relative">
            {/* Global grid background */}
            <div className="absolute inset-0 technical-grid opacity-30 pointer-events-none fixed"></div>

            {/* Hero Section */}
            <section className="relative px-6 pt-32 pb-40 flex flex-col items-center justify-center min-h-[90vh]">
                <div className="mx-auto max-w-6xl relative z-10 text-center flex flex-col items-center w-full">
                    <div className="animate-fade-in inline-flex items-center gap-3 px-4 py-1.5 bg-muted/50 border border-black/10 dark:border-white/10 text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-12 font-mono rounded-sm">
                        <span className="w-2 h-2 rounded-none bg-primary animate-pulse"></span>
                        v2.4 Technical Release
                    </div>

                    <h1 className="text-[clamp(3rem,10vw,10rem)] w-full font-extrabold tracking-tighter text-foreground font-display leading-[0.85] mb-8 animate-fade-up uppercase relative mix-blend-difference dark:mix-blend-difference break-words">
                        Visual<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20">
                            Compositor
                        </span>
                    </h1>

                    <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground mb-16 animate-fade-up [--animation-delay:200ms] font-mono font-medium">
                        High-precision studio for designers to craft screenshot compositions and professional asset packshots with zero friction.
                    </p>

                    <div className="flex items-center justify-center gap-6 animate-fade-up [--animation-delay:400ms] w-full max-w-md">
                        <Link
                            to="/mockup"
                            className="flex-1 px-8 py-5 bg-primary text-primary-foreground border border-primary font-bold transition-all hover:bg-transparent hover:text-primary dark:hover:shadow-[0_0_30px_rgba(202,252,0,0.3)] text-center font-mono uppercase tracking-widest text-sm rounded-sm"
                        >
                            Initialize Studio
                        </Link>
                    </div>
                </div>

                {/* Hero Browser Shell */}
                <div className="mt-24 mx-auto w-full max-w-6xl animate-fade-up [--animation-delay:600ms] relative z-20">
                    <div className="browser-shell group transition-colors hover:border-primary/50">
                        <div className="browser-header">
                            <div className="browser-dot"></div>
                            <div className="browser-dot"></div>
                            <div className="browser-dot"></div>
                            <div className="ml-4 px-3 py-1 bg-muted/30 border border-black/10 dark:border-white/10 text-[10px] text-muted-foreground font-mono w-48 sm:w-64 truncate rounded-sm">
                                ~ /studio /gridshadow /app
                            </div>
                        </div>
                        <div className="relative aspect-[16/10] overflow-hidden bg-black/5 dark:bg-white/5">
                            <img
                                src={theme === "light" ? "/shot-light.png" : "https://github.com/user-attachments/assets/c54f0433-8695-42bb-b4bd-098cd912aeb3"}
                                alt="Studio Interface"
                                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-[1.02] filter dark:contrast-125 dark:saturate-50"
                            />
                            {/* Overlay scanline effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 hidden md:block"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section 1: How it Works */}
            <section className="py-32 px-6 border-y border-black/10 dark:border-white/10 bg-background relative z-10">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row gap-20 items-center">
                        <div className="flex-1 space-y-12">
                            <div className="text-primary font-bold text-sm uppercase tracking-[0.3em] font-mono flex items-center gap-4">
                                <span className="w-8 h-px bg-primary hidden md:block"></span>
                                Core Workflow
                            </div>
                            <h2 className="text-5xl font-extrabold text-foreground leading-[1.1] font-display uppercase tracking-tight">
                                Absolute Layout Control.
                            </h2>
                            <div className="space-y-12 pt-8 text-muted-foreground border-black/10 dark:border-white/10 pl-8">
                                <StepItem num="01" title="Import Assets" desc="Drag and drop high-resolution screenshots. Native support for 4K PNG and WebP formats." />
                                <StepItem num="02" title="Snap & Compose" desc="Proprietary grid engine automatically aligns assets with consistent spacing and smart edge-snapping." />
                                <StepItem num="03" title="Fine-tune Styles" desc="Adjust background gradients, dynamic shadows, and border radii to match your design system." />
                            </div>
                        </div>
                        <div className="flex-1 relative w-full">
                            <div className="relative p-1 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 rounded-sm">
                                <div className="grid grid-cols-2 gap-px bg-black/10 dark:bg-white/10">
                                    <div className="aspect-square bg-background p-8 flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-0 technical-grid opacity-20"></div>
                                        <div className="w-24 h-24 bg-muted border border-black/10 dark:border-white/10 flex items-center justify-center transition-transform group-hover:rotate-12 group-hover:scale-110 z-10 shadow-lg dark:shadow-2xl">
                                            <ImageIcon className="text-muted-foreground w-8 h-8" />
                                        </div>
                                    </div>
                                    <div className="aspect-square bg-background p-8 flex flex-col gap-4">
                                        <div className="w-full flex-1 bg-muted border border-black/10 dark:border-white/10 rounded-sm"></div>
                                        <div className="w-3/4 h-2 bg-black/20 dark:bg-black/20 dark:bg-white/20 rounded-none"></div>
                                    </div>
                                    <div className="col-span-2 aspect-[2/1] bg-muted/30 p-8 flex items-center justify-between border-t border-black/10 dark:border-white/10">
                                        <div className="space-y-4">
                                            <div className="w-32 h-1 bg-primary"></div>
                                            <div className="w-24 h-1 bg-black/20 dark:bg-black/20 dark:bg-white/20"></div>
                                        </div>
                                        <div className="w-16 h-16 bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(202,252,0,0.2)]">
                                            <Download className="text-black w-6 h-6" strokeWidth={3} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section 2: Features Grid */}
            <section className="py-40 px-6 relative z-10 bg-background">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-black/10 dark:border-white/10 pb-12">
                        <div className="flex-1">
                            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 font-display uppercase tracking-tight">
                                High-Level Production
                            </h2>
                            <p className="text-muted-foreground max-w-xl font-mono text-sm leading-relaxed">
                                Modern tools require modern foundations. Built to be the fastest way to industrial-grade results.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10">
                        <FeatureBlock icon={<Combine />} title="Grid Autopilot" desc="Forget pixel-pushing. Our layout engine handles it for you." />
                        <FeatureBlock icon={<Layers />} title="Shadow Depth" desc="Dynamic multi-layer shadows that feel organic and real." />
                        <FeatureBlock icon={<Monitor />} title="Retina Export" desc="Hardware-accelerated exports up to 4K resolution." />
                        <FeatureBlock icon={<ShieldCheck />} title="Asset Security" desc="Client-side processing. Your assets never leave your computer." />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="pt-24 pb-12 px-6 border-t border-black/10 dark:border-white/10 bg-background relative z-10">
                <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12 font-mono">
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white flex items-center justify-center p-2">
                                <img src="/GridShadow.png" alt="GS" className="w-full h-full" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter uppercase text-foreground font-display">GridShadow</span>
                        </div>
                        <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
                            Layout-first mockup studio for professional asset production. Built for precision.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-foreground mb-8 text-xs uppercase tracking-[0.2em]">System</h4>
                        <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                            <Link to="/mockup" className="hover:text-primary transition-colors flex items-center gap-2 group">
                                <span className="w-2 h-px bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Studio Editor
                            </Link>
                            <Link to="/frame" className="hover:text-primary transition-colors flex items-center gap-2 group">
                                <span className="w-2 h-px bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Frame Library
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-foreground mb-8 text-xs uppercase tracking-[0.2em]">Network</h4>
                        <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                            <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                                <span className="w-2 h-px bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Twitter (X)
                            </a>
                            <a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group">
                                <span className="w-2 h-px bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Support
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl mt-24 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-muted-foreground">
                    <div className="uppercase tracking-[0.2em]">© 2026 GridShadow Studio</div>
                    <div className="flex items-center gap-8 uppercase tracking-[0.2em]">
                        <span className="hover:text-foreground cursor-pointer transition-colors">Legal</span>
                        <span className="hover:text-foreground cursor-pointer transition-colors">Privacy</span>
                        <span className="text-primary border border-primary/30 px-2 py-1 bg-primary/5">Status: Operational</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const StepItem = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
    <div className="flex gap-6 items-start group relative">
        <div className="absolute -left-[32px] top-1.5 w-[9px] h-[9px] bg-background border-2 border-primary rounded-full group-hover:bg-primary transition-colors"></div>
        <div className="text-sm font-black text-foreground font-mono mt-0.5 opacity-50">{num}</div>
        <div className="space-y-2">
            <h4 className="text-xl font-bold text-foreground font-display tracking-tight uppercase">{title}</h4>
            <p className="text-sm leading-relaxed text-muted-foreground font-mono">{desc}</p>
        </div>
    </div>
);

const FeatureBlock = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="p-10 bg-background hover:bg-black/5 dark:bg-white/5 transition-colors group">
        <div className="w-12 h-12 flex items-center justify-center text-muted-foreground mb-8 group-hover:text-primary transition-colors border border-black/10 dark:border-white/10 group-hover:border-primary/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {icon}
        </div>
        <h4 className="text-lg font-bold text-foreground mb-4 font-display uppercase tracking-tight">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed font-mono">{desc}</p>
    </div>
);
