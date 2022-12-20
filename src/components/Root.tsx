import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import { HiVideoCamera } from "react-icons/hi";
import { useTheme } from "../theme";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
export const Root: FC = () => {
  const navigation = useNavigation();
  const [theme, setTheme] = useTheme();
  return (
    <div className="pb-4 mx-auto max-w-screen-2xl flex">
      <div className="text-sm font-medium w-full flex flex-col">
        <div className="text-xl pl-4 py-2 font-extrabold bg-purple-600 dark:bg-purple-500 text-white dark:text-zinc-950 flex flex-row items-center">
          <Link
            to={"/"}
            className="flex flex-row items-center hover:opacity-75"
          >
            <HiVideoCamera className="w-7 h-7" />
            <div className="pl-1 hidden md:block">VODs</div>
          </Link>
          <div className="w-full"></div>
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
        </div>
        {navigation.state === "loading" ? (
          <div className="px-5 py-5 space-y-3">
            <pre>Loading...</pre>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
