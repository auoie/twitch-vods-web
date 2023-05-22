import { FC } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Metadata, Streams as StreamArr } from "../type";
import { durationToString } from "../utils";
import { ImageOrEmpty } from "./ImageOrEmpty";

const Game: FC<{ vod: Metadata }> = ({ vod }) => {
  return vod.BoxArtUrlAtStart.Valid ? (
    <img
      src={vod.BoxArtUrlAtStart.String}
      width={35}
      height={49}
      alt={vod.GameNameAtStart}
    />
  ) : vod.GameIDAtStart !== "" ? (
    <img
      src={`https://static-cdn.jtvnw.net/ttv-boxart/${vod.GameIDAtStart}-40x56.jpg`}
      width={35}
      height={49}
      alt={vod.GameNameAtStart}
    />
  ) : (
    <img
      src="https://static-cdn.jtvnw.net/ttv-static/404_boxart-40x56.jpg"
      width={35}
      height={49}
      alt={vod.GameNameAtStart}
    />
  );
};

export const Streams: FC<{ vods: StreamArr }> = ({ vods }) => {
  return (
    <div className="w-full mb-48">
      {vods.map(({ Link: vodLink, Metadata: vod }) => (
        <div key={vod.ID} className="flex flex-col pb-3 pl-2">
          <div className="flex flex-row items-center whitespace-nowrap h-5">
            {vod.BytesFound.Bool ? (
              <>
                <a
                  className="text-purple-400 hover:text-purple-500 flex items-center"
                  href={`${import.meta.env.VITE_API_URL}${vodLink}`}
                  target="_blank"
                >
                  {vod.TitleAtStart}
                  <BiLinkExternal className="w-4 h-4 flex-shrink-0 ml-1" />
                </a>
              </>
            ) : (
              vod.TitleAtStart
            )}
          </div>
          <div className="font-mono text-xs flex items-center">
            <div className="flex flex-row">
              <Link to={`/channels/@${vod.StreamerLoginAtStart}`}>
                <ImageOrEmpty
                  src={vod.ProfileImageUrlAtStart.String}
                  className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] hover:shadow-md hover:shadow-purple-400 flex items-center justify-center text-xl select-none"
                />
              </Link>
              <div className="pl-1">
                <div className="hover:shadow-md hover:shadow-purple-400 w-[35px] min-w-[35px]">
                  <Link to={`/categories/@${vod.GameIDAtStart}`}>
                    <Game vod={vod} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="ml-2 w-full">
              <div className="text-ellipsis whitespace-nowrap w-full">
                <div className="font-normal flex flex-row">
                  <div className="w-40 flex-shrink-0 flex justify-end">
                    {vod.StartTime}
                  </div>
                  <div className="w-4 flex justify-center items-center flex-shrink-0">
                    |
                  </div>
                  <div>
                    {vod.HlsDurationSeconds.Valid && (
                      <div>
                        {durationToString(vod.HlsDurationSeconds.Float64)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="font-normal flex flex-row">
                  <div className="w-14  flex justify-end items-center flex-shrink-0">
                    {vod.MaxViews}
                  </div>
                  <div className="w-4 flex justify-center items-center flex-shrink-0">
                    |
                  </div>
                  <div className="w-[5.5rem] flex justify-end flex-shrink-0">
                    {vod.StreamID}
                  </div>
                  <div className="w-4 flex justify-center items-center flex-shrink-0">
                    |
                  </div>
                  <div>{vod.StreamerLoginAtStart}</div>
                </div>
                <div className="font-normal flex flex-row">
                  <div className="w-14 justify-end items-center flex flex-shrink-0">
                    {vod.Public.Valid && (
                      <div>{vod.Public.Bool ? "Public" : "Private"}</div>
                    )}
                  </div>
                  <div className="w-4 flex justify-center items-center flex-shrink-0">
                    |
                  </div>
                  {/* <div className="w-8 flex flex-row justify-end flex-shrink-0">
                    {vod.SubOnly.Valid && (
                      <div className="">
                        {vod.SubOnly.Bool ? "Sub" : "Free"}
                      </div>
                    )}
                  </div> */}
                  {/* <div className="w-4 flex justify-center items-center flex-shrink-0">
                    |
                  </div> */}
                  <div className="w-[5.5rem] flex justify-end items-center flex-shrink-0">
                    @{vod.LanguageAtStart}
                  </div>
                  <div className="w-4 flex justify-center items-center flex-shrink-0">
                    |
                  </div>
                  <div>{vod.GameNameAtStart}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
