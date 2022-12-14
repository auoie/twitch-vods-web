import { FC } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Res } from "../routes/front";

export const FrontPage: FC = () => {
  const vods = useLoaderData() as Res;
  return (
    <div className="px-5 py-5 space-y-3">
      {vods.result === "misformattted" ? (
        <>Misformatted response.</>
      ) : vods.result === "error" ? (
        <>Fetch failed.</>
      ) : (
        <>
          {vods.data.map((vod) => (
            <div
              key={vod.StreamID}
              className="flex flex-row justify-between items-center"
            >
              <div className="flex flex-col whitespace-nowrap text-ellipsis overflow-hidden ticker-shadow w-full">
                <div className="text-xs font-normal">
                  {`${new Date(vod.StartTime)
                    .toISOString()
                    .replace("T", " ")
                    .substring(0, 19)} GMT`}
                </div>
                <div>{vod.TitleAtStart}</div>
              </div>
              <div className="flex space-x-2 flex-row">
                <div>{vod.MaxViews}</div>
                <div>{vod.StreamID}</div>
                <div>
                  <Link
                    className="underline hover:text-zinc-900 hover:bg-zinc-50"
                    to={`/channels/${vod.StreamerLoginAtStart}`}
                  >
                    {vod.StreamerLoginAtStart}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
