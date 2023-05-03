import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { AiFillHome } from "react-icons/ai";
import { Search } from "./Search";
export const Root: FC = () => {
  return (
    <div className="pb-4 mx-auto max-w-6xl flex">
      <div className="text-sm font-medium w-full flex flex-col">
        <div className="bg-purple-400 text-white dark:text-zinc-950 flex flex-row items-center overflow-hidden">
          <Link
            to={"/"}
            className="text-xl font-bold flex h-10 flex-row items-center bg-white dark:bg-zinc-950 text-purple-400 sm:w-20 hover:text-purple-500 justify-center shrink-0"
          >
            <div className="hidden sm:block">VODs</div>
            <div className="sm:hidden w-12 h-6">
              <AiFillHome className="w-full h-full" />
            </div>
          </Link>
          <div className="uppercase">
            <Link to={"/categories"}>
              <div className="hover:bg-white dark:hover:bg-zinc-950 hover:text-purple-400 pl-2 w-[6.5rem]">
                Categories
              </div>
            </Link>
            <Link to={"/languages"}>
              <div className="hover:bg-white dark:hover:bg-zinc-950 hover:text-purple-400 pl-2 w-[6.5rem]">
                Languages
              </div>
            </Link>
          </div>
          <div className="w-full h-full border-x-white dark:border-x-zinc-950 border-l-2">
            <Search />
          </div>
          <ThemeToggle />
        </div>
        <div className="px-2">Doesn't work anymore. Use Twitch VOD Downloader extension instead.</div>
        <Outlet />
      </div>
    </div>
  );
};
