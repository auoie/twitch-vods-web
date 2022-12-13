import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
export const Root: FC = () => {
  const navigation = useNavigation();
  return (
    <div className="mx-auto max-w-7xl text-sm font-medium bg-zinc-900 text-zinc-50 my-4 overflow-hidden">
      <p className="text-2xl text-center py-2 font-extrabold text-zinc-900 bg-purple-500">
        <Link to={"/"}>Twitch VODs</Link>
      </p>
      {navigation.state === "loading" ? (
        <div className="px-5 py-5 space-y-3">
          <pre>Loading...</pre>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};
