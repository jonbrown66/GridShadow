export interface NavLinkItem {
  label: string;
  path: string;
}

export const mainNav: NavLinkItem[] = [
  { label: "Home", path: "/" },
  { label: "Mockup", path: "/mockup" },
  { label: "Frame", path: "/frame" },
  { label: "About", path: "/about" },
];
