import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";
type Theme = "light" | "dark";
const browser = typeof window !== "undefined";
const themeAtom = atomWithStorage<Theme>(
  "theme",
  browser && matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
);
export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  useEffect(() => {
    if (!browser) return;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  return [theme, setTheme] as const;
};
