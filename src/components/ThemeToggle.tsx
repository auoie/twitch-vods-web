import { FC } from "react";
import { IoMdFlashlight } from "react-icons/io";
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
      className="px-2 h-10 flex items-center justify-center hover:text-purple-500 text-purple-400 bg-white dark:bg-zinc-950"
      onClick={() => {
        setTheme((prev) => {
          return prev === "dark" ? "light" : "dark";
        });
      }}
    >
      <div className="h-6 w-8">
        <IoMdFlashlight className="w-full h-full" />
      </div>
    </button>
  );
};
