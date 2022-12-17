import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { Res } from "../routes/type";
import { durationToString } from "../utils";

export const ChannelPage: FC = () => {
  const vods = useLoaderData() as Res;
  return (
    <div className="px-5 py-5 space-y-3">
      {vods.result === "misformatted" ? (
        <>Misformatted response.</>
      ) : vods.result === "error" ? (
        <>Channel <code>`{vods.data}`</code> not found.</>
      ) : (
        <>
          {vods.data.map(({ Link, Metadata: vod }) => (
            <div
              key={vod.StreamID}
              className="flex flex-row justify-between items-center whitespace-nowrap"
            >
              <div className="flex flex-col text-ellipsis overflow-hidden ticker-shadow w-full">
                <div className="text-xs font-normal">
                  {`${new Date(vod.StartTime)
                    .toISOString()
                    .replace("T", " ")
                    .substring(0, 19)} GMT`}
                </div>
                <div>
                  {vod.BytesFound.Bool ? (
                    <a
                      className="underline hover:bg-zinc-50 hover:text-zinc-900"
                      href={`http://localhost:3000${Link}`}
                      target="_blank"
                    >
                      {vod.TitleAtStart}
                    </a>
                  ) : (
                    vod.TitleAtStart
                  )}
                </div>
              </div>
              <div className="flex space-x-2 flex-row">
                {vod.HlsDurationSeconds.Valid && (
                  <div>{durationToString(vod.HlsDurationSeconds.Float64)}</div>
                )}
                {vod.BytesFound.Valid && (
                  <div>{vod.BytesFound.Bool ? "Found" : "Not found"}</div>
                )}
                {vod.Public.Valid && (
                  <div>{vod.Public.Bool ? "Public" : "Private"}</div>
                )}
                {vod.SubOnly.Valid && (
                  <div className="">
                    {vod.SubOnly.Bool ? "Sub-Only" : "No-Sub"}
                  </div>
                )}
                <div>{vod.GameNameAtStart}</div>
                <div>{vod.LanguageAtStart}</div>
                <div>{vod.MaxViews}</div>
                <div>{vod.StreamID}</div>
                <div>{vod.StreamerLoginAtStart}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
