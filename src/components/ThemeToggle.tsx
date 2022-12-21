import { FC } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { atomWithStorage } from "jotai/utils";
import { useSetAtom } from "jotai";

type Theme = "light" | "dark";
const browser = typeof window !== "undefined";
const themeAtom = atomWithStorage<Theme>(
  "theme",
  browser && matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
);
export const ThemeToggle: FC = () => {
  const setTheme = useSetAtom(themeAtom);
  return (
    <button
      className="h-7 w-7 mr-2 flex items-center justify-center hover:opacity-75"
      onClick={() => {
        setTheme((prev) => {
          const newTheme = prev === "dark" ? "light" : "dark";
          document.documentElement.classList.remove("light", "dark");
          document.documentElement.classList.add(newTheme);
          document.documentElement.style.colorScheme = newTheme;
          return newTheme;
        });
      }}
    >
      <BsSunFill className="dark:hidden w-full h-full" />
      <BsMoonFill className="hidden dark:block w-full h-full" />
    </button>
  );
};
