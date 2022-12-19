import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import { HiVideoCamera } from "react-icons/hi";
export const Root: FC = () => {
  const navigation = useNavigation();
  return (
    <div className="py-4 mx-auto max-w-screen-2xl flex">
      <div className="text-sm font-medium  text-zinc-50 w-full flex flex-col">
        <div className="text-xl pl-4 py-2 font-extrabold text-zinc-900 bg-purple-500 flex flex-row">
          <Link
            to={"/"}
            className="flex flex-row items-center hover:opacity-80"
          >
            <HiVideoCamera className="w-7 h-7" />
            <div className="pl-1 hidden md:block">VODs</div>
          </Link>
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
