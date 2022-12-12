import { FC } from "react";

export const ErrorPage: FC = () => {
  return (
    <div className="mx-auto max-w-7xl text-sm font-medium bg-black text-zinc-100">
      <p className="text-2xl text-center py-2 font-extrabold text-black bg-purple-500">
        Twitch VODs
      </p>
      <div className="px-5 py-5 space-y-3">Not found.</div>
    </div>
  );
};
