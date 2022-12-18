import { FC } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Streams as StreamArr } from "../routes/type";
import { durationToString } from "../utils";
import { ImageOrEmpty } from "./ImageOrEmpty";

export const Streams: FC<{ vods: StreamArr }> = ({ vods }) => {
  return (
    <>
      {vods.map(({ Link: vodLink, Metadata: vod }) => (
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
            {vod.BytesFound.Bool ? (
              <div className="flex flex-row items-center">
                <a
                  className="text-purple-400  hover:text-purple-300"
                  href={`http://localhost:3000${vodLink}`}
                  target="_blank"
                >
                  {vod.TitleAtStart}
                </a>
                <BiLinkExternal className="w-4 h-4 flex-shrink-0 ml-1" />
              </div>
            ) : (
              <div>{vod.TitleAtStart}</div>
            )}
          </div>
          <div className="flex space-x-2 flex-row items-center flex-shrink-0">
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
              <div className="">{vod.SubOnly.Bool ? "Sub-Only" : "No-Sub"}</div>
            )}
            {vod.BoxArtUrlAtStart !== "" ? (
              <img
                src={vod.BoxArtUrlAtStart}
                width={20}
                height={28}
                alt={vod.GameNameAtStart}
              />
            ) : vod.GameIDAtStart !== "" ? (
              <img
                src={`https://static-cdn.jtvnw.net/ttv-boxart/${vod.GameIDAtStart}-40x56.jpg`}
                width={20}
                height={28}
                alt={vod.GameNameAtStart}
              />
            ) : (
              <img
                src="https://static-cdn.jtvnw.net/ttv-static/404_boxart-40x56.jpg"
                width={20}
                height={28}
                alt={vod.GameNameAtStart}
              />
            )}
            <div>{vod.LanguageAtStart}</div>
            <div>{vod.MaxViews}</div>
            <div>{vod.StreamID}</div>
            <div>
              <Link
                className="text-purple-400 hover:text-purple-300"
                to={`/channels/${vod.StreamerLoginAtStart}`}
              >
                {vod.StreamerLoginAtStart}
              </Link>
            </div>
            <ImageOrEmpty
              src={vod.ProfileImageUrlAtStart}
              className="w-7 h-7"
            />
          </div>
        </div>
      ))}
    </>
  );
};
