import { FC } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useAtom } from "jotai";

type Theme = "light" | "dark";
const browser = typeof window !== "undefined";
const storage = createJSONStorage<Theme>(function () {
  return window.localStorage;
});
const setTheme = (theme: Theme) => {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
  document.documentElement.style.colorScheme = theme;
};
const themeAtom = atomWithStorage<Theme>(
  "theme",
  browser && matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
  {
    ...storage,
    setItem: (key, newValue) => {
      storage.setItem(key, newValue);
      setTheme(newValue);
    },
    subscribe: (key, callback) => {
      const newCallback = (theme: Theme) => {
        callback(theme);
        setTheme(theme);
      };
      return storage.subscribe!(key, newCallback);
    },
  }
);
export const ThemeToggle: FC = () => {
  const [_, setTheme] = useAtom(themeAtom);
  return (
    <button
      className="h-7 w-7 mr-2 flex items-center justify-center hover:opacity-75"
      onClick={() => {
        setTheme((prev) => {
          return prev === "dark" ? "light" : "dark";
        });
      }}
    >
      <BsSunFill className="dark:hidden w-full h-full" />
      <BsMoonFill className="hidden dark:block w-full h-full" />
    </button>
  );
};
