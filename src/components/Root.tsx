import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { HiVideoCamera } from "react-icons/hi";
import { ThemeToggle } from "./ThemeToggle";
export const Root: FC = () => {
  return (
    <div className="pb-4 mx-auto max-w-6xl flex">
      <div className="text-sm font-medium w-full flex flex-col">
        <div className="text-xl pl-2 py-2 font-bold bg-purple-400 text-white dark:text-zinc-950 flex flex-row items-center">
          <Link
            to={"/"}
            className="flex flex-row items-center hover:opacity-75"
          >
            <HiVideoCamera className="w-7 h-7" />
            <div className="pl-1 hidden sm:block">VODs</div>
          </Link>
          <div className="w-full"></div>
          <ThemeToggle />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
