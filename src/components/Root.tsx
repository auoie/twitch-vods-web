import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
export const Root: FC = () => {
  const navigation = useNavigation();
  return (
    <div className="mx-auto max-w-7xl text-sm font-medium bg-black text-zinc-100 my-4 overflow-hidden">
      <p className="text-2xl text-center py-2 font-extrabold text-black bg-purple-500">
        Twitch VODs
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
