import React from "react";
import { NavLink, Link } from "react-router-dom";
import { mainNav } from "../config/navigation";
import { ThemeToggle } from "../theme/ThemeToggle";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden font-sans">
      <header className="shrink-0 z-50 sticky top-0 border-b border-black/10 dark:border-white/10 dark:border-black/10 dark:border-white/10 border-black/10 bg-background/80 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-10">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img
                className="h-10 w-10 relative rounded-sm border border-black/20 dark:border-black/20 dark:border-white/20 shadow-none transition-transform group-hover:scale-105 group-active:scale-95 filter invert dark:invert-0"
                alt="GridShadow mark"
                src="/GridShadow.png"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight text-foreground font-display">
                GridShadow
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground font-mono">
                Studio
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-1.5 p-1 rounded-sm bg-muted/30 border border-black/10 dark:border-black/5 dark:border-white/5 backdrop-blur-sm">
              {mainNav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-5 py-2 rounded-sm text-xs font-bold tracking-wide transition-all duration-300 font-mono ${isActive
                      ? "bg-primary text-primary-foreground shadow-none"
                      : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden min-h-0 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        {children}
      </main>
    </div>
  );
};
