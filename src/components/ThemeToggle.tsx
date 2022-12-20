import { FC } from "react";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { useTheme } from "../theme";

export const ThemeToggle: FC = () => {
  const [theme, setTheme] = useTheme();
  return (
    <button
      className="h-7 w-7 mr-2 flex items-center justify-center hover:opacity-75"
      onClick={() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      }}
    >
      {theme === "light" ? (
        <BsSunFill className="w-full h-full" />
      ) : (
        <BsMoonFill className="w-full h-full" />
      )}
    </button>
  );
};
