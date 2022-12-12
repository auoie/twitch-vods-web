import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { is } from "typescript-json";

type Streams = Stream[];
type Stream = {
  Link: string;
  Metadata: Metadata;
};
type Metadata = {
  ID: string;
  LastUpdatedAt: string;
  MaxViews: number;
  StartTime: string;
  StreamerID: string;
  StreamID: string;
  StreamerLoginAtStart: string;
  GameNameAtStart: string;
  LanguageAtStart: string;
  TitleAtStart: string;
  IsMatureAtStart: boolean;
  GameIDAtStart: string;
  LastUpdatedMinusStartTimeSeconds: number;
  RecordingFetchedAt: RecordingFetchedAt;
  HlsDomain: HlsDomain;
  BytesFound: BytesFound;
  SeekPreviewsDomain: SeekPreviewsDomain;
  Public: Public;
  SubOnly: SubOnly;
  HlsDurationSeconds: HlsDurationSeconds;
};
type RecordingFetchedAt = {
  Time: string;
  Valid: boolean;
};
type HlsDomain = {
  String: string;
  Valid: boolean;
};
type BytesFound = {
  Bool: boolean;
  Valid: boolean;
};
type SeekPreviewsDomain = {
  String: string;
  Valid: boolean;
};
type Public = {
  Bool: boolean;
  Valid: boolean;
};
type SubOnly = {
  Bool: boolean;
  Valid: boolean;
};
type HlsDurationSeconds = {
  Float64: number;
  Valid: boolean;
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
export const fetchChannel = async (channelLogin: string): Promise<Res> => {
  try {
    const response = await fetch(
      `http://localhost:3000/channels/${channelLogin}`
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
export const ChannelPage: FC = () => {
  const vods = useLoaderData() as Res;
  return (
    <div className="px-5 py-5 space-y-3">
      {vods.result === "misformattted" ? (
        <>Misformatted response.</>
      ) : vods.result === "error" ? (
        <>Channel not found.</>
      ) : (
        <>
          {vods.data.map(({ Link, Metadata: vod }) => (
            <div
              key={vod.StreamID}
              className="flex flex-row justify-between items-center"
            >
              <div className="flex flex-col whitespace-nowrap text-ellipsis overflow-hidden ticker-shadow w-full">
                <div className="text-xs font-normal">
                  {new Date(vod.StartTime).toUTCString()}
                </div>
                <div className="text-zinc-300">
                  {vod.BytesFound.Bool ? (
                    <a
                      className="underline hover:bg-white hover:text-black"
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
                <div className="whitespace-nowrap">
                  {vod.BytesFound.Bool ? "Found" : "Not found"}
                </div>
                <div>{vod.Public.Bool ? "Public" : "Private"}</div>
                <div>{vod.StreamID}</div>
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
