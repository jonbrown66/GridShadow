import React from "react";
import { NavLink } from "react-router-dom";
import { mainNav } from "../config/navigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
      <header className="shrink-0 border-b border-transparent bg-gradient-to-r from-[#f4f7ff] via-white to-[#fefdfb] shadow-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 lg:px-8">
          <div className="flex items-center gap-4">
            <img
              className="h-11 w-11 rounded-2xl border border-white/80 shadow-md shadow-black/5"
              alt="GridShadow mark"
              src="/GridShadow.png"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base font-semibold tracking-wide text-gray-900">
                GridShadow
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
                Visual composing suite
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-2 rounded-full bg-white/80 px-2 py-1 shadow-inner ring-1 ring-white/60 backdrop-blur">
            {mainNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-[#cafc00] text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden min-h-0">{children}</main>
    </div>
  );
};
