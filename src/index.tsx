import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./app/theme/ThemeProvider";
import App from "./App";
import "./tailwind.css";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
