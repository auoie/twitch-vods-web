import { FC } from "react";
import { useRouteError } from "react-router-dom";
import { is } from "typescript-json";

type Error = {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
};

export const ErrorPage: FC = () => {
  const err = useRouteError();
  return (
    <div className="mx-auto max-w-7xl text-sm font-medium bg-black text-zinc-100 my-4 overflow-hidden">
      <p className="text-2xl text-center py-2 font-extrabold text-black bg-purple-500">
        Twitch VODs
      </p>
      <div className="px-5 py-5 space-y-3">
        {is<Error>(err) ? (
          <pre>
            <div>Status: {err.status}</div>
            <div>Status Text: {err.statusText}</div>
            <div>{err.data}</div>
          </pre>
        ) : (
          <pre>{JSON.stringify(err, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};
