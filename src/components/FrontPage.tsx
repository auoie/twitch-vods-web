import { FC } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { is } from "typescript-json";

type Streams = Stream[];
type Stream = {
  StreamerLoginAtStart: string;
  TitleAtStart: string;
  MaxViews: number;
  StartTime: string;
  StreamID: string;
};
type ResGood = {
  readonly result: "good";
  readonly data: Stream[];
};
type ResMisformatted = {
  readonly result: "misformattted";
};
type ResError = {
  readonly result: "error";
};
type Res = ResGood | ResError | ResMisformatted;
export const fetchFrontPage = async (): Promise<Res> => {
  try {
    const response = await fetch(
      "http://localhost:3000/highest_viewed_private_available"
    );
    const data = (await response.json()) as unknown;
    if (is<Streams>(data)) {
      return { result: "good", data } as const;
    }
    return { result: "misformattted" } as const;
  } catch {
    return { result: "error" } as const;
  }
};
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
                  {new Date(vod.StartTime).toUTCString()}
                </div>
                <div className="text-zinc-300">{vod.TitleAtStart}</div>
              </div>
              <div className="flex space-x-2 flex-row">
                <div>{vod.MaxViews}</div>
                <div>{vod.StreamID}</div>
                <div>
                  <Link
                    className="underline hover:text-black hover:bg-white"
                    to={`/channel/${vod.StreamerLoginAtStart}`}
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
