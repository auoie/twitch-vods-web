import { FC } from "react";
import { BiLinkExternal } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Metadata, Streams as StreamArr } from "../routes/type";
import { durationToString } from "../utils";
import { ImageOrEmpty } from "./ImageOrEmpty";

const Game: FC<{ vod: Metadata }> = ({ vod }) => {
  return vod.BoxArtUrlAtStart !== "" ? (
    <img
      src={vod.BoxArtUrlAtStart}
      width={25}
      height={35}
      alt={vod.GameNameAtStart}
    />
  ) : vod.GameIDAtStart !== "" ? (
    <img
      src={`https://static-cdn.jtvnw.net/ttv-boxart/${vod.GameIDAtStart}-40x56.jpg`}
      width={25}
      height={35}
      alt={vod.GameNameAtStart}
    />
  ) : (
    <img
      src="https://static-cdn.jtvnw.net/ttv-static/404_boxart-40x56.jpg"
      width={25}
      height={28}
      alt={vod.GameNameAtStart}
    />
  );
};

export const Streams: FC<{ vods: StreamArr }> = ({ vods }) => {
  return (
    <table className="w-full">
      <tbody className="max-w-min">
        {vods.map(({ Link: vodLink, Metadata: vod }) => (
          <tr key={vod.StreamID}>
            <td className="w-full">
              <div className="text-ellipsis overflow-hidden whitespace-nowrap w-full block relative">
                <div className="text-xs font-normal flex flex-row space-x-2 font-mono">
                  <div>
                    {`${new Date(vod.StartTime)
                      .toISOString()
                      .replace("T", " ")
                      .substring(0, 19)} GMT`}
                  </div>
                  <div>|</div>
                  <div>{vod.StreamID}</div>
                </div>
                <div className="relative block h-5 ticker-shadow">
                  <div className="flex flex-row items-center whitespace-nowrap absolute">
                    {vod.BytesFound.Bool ? (
                      <>
                        <a
                          className="text-purple-400  hover:text-purple-300"
                          href={`${import.meta.env.VITE_API_URL}${vodLink}`}
                          target="_blank"
                        >
                          {vod.TitleAtStart}
                        </a>
                        <BiLinkExternal className="w-4 h-4 flex-shrink-0 ml-1" />
                      </>
                    ) : (
                      vod.TitleAtStart
                    )}
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="w-20 flex items-center justify-end">
                {vod.HlsDurationSeconds.Valid && (
                  <div>{durationToString(vod.HlsDurationSeconds.Float64)}</div>
                )}
              </div>
            </td>
            <td>
              <div className="w-16 justify-center items-center flex">
                {vod.Public.Valid && (
                  <div>{vod.Public.Bool ? "Public" : "Private"}</div>
                )}
              </div>
            </td>
            <td>
              <div className="w-10 overflow-hidden flex flex-row justify-center">
                {vod.SubOnly.Valid && (
                  <div className="">{vod.SubOnly.Bool ? "Sub" : "Free"}</div>
                )}
              </div>
            </td>
            <td>
              <div className="w-[25px]">
                {vod.GameIDAtStart !== "" ? (
                  <div className="hover:shadow-lg hover:shadow-purple-400">
                    <Link
                      to={`/categories/${vod.GameIDAtStart}`}
                      className="hover:shadow-lg hover:shadow-purple-300"
                    >
                      <Game vod={vod} />
                    </Link>
                  </div>
                ) : (
                  <Game vod={vod} />
                )}
              </div>
            </td>
            <td>
              <div className="w-10 flex justify-center items-center">
                {vod.LanguageAtStart}
              </div>
            </td>
            <td className="pr-2">
              <div className="w-14 overflow-hidden flex justify-end font-mono items-center">
                {vod.MaxViews}
              </div>
            </td>
            <td>
              <div className="w-40 overflow-hidden ticker-shadow">
                <Link
                  className="text-purple-400 hover:text-purple-300"
                  to={`/channels/${vod.StreamerLoginAtStart}`}
                >
                  {vod.StreamerLoginAtStart}
                </Link>
              </div>
            </td>
            <td className="">
              <div className="py-1">
                <ImageOrEmpty
                  src={vod.ProfileImageUrlAtStart}
                  className="w-[35px] h-[35px]"
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
