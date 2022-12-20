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
            <td className="w-full pl-4">
              <div className="text-ellipsis overflow-hidden whitespace-nowrap w-full block relative">
                <div className="text-xs font-normal flex flex-row space-x-1 font-mono">
                  <div>{vod.StartTime}</div>
                  <div>|</div>
                  <div>{vod.StreamID}</div>
                </div>
                <div className="relative block h-5 ticker-shadow">
                  <div className="flex flex-row items-center whitespace-nowrap absolute">
                    {vod.BytesFound.Bool ? (
                      <>
                        <a
                          className=" text-purple-600 hover:text-purple-400 dark:text-purple-400  dark:hover:text-purple-300"
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
              <div className="w-16 flex items-center justify-end">
                {vod.HlsDurationSeconds.Valid && (
                  <div className="font-mono text-xs">
                    {durationToString(vod.HlsDurationSeconds.Float64)}
                  </div>
                )}
              </div>
            </td>
            <td>
              <div className="w-14 justify-center items-center flex text-xs">
                {vod.Public.Valid && (
                  <div>{vod.Public.Bool ? "Public" : "Private"}</div>
                )}
              </div>
            </td>
            <td>
              <div className="w-8 overflow-hidden flex flex-row justify-center text-xs">
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
              <div className="w-10 flex justify-center items-center text-xs">
                {vod.LanguageAtStart}
              </div>
            </td>
            <td className="pr-2">
              <div className="w-12 overflow-hidden flex justify-end font-mono text-xs items-center">
                {vod.MaxViews}
              </div>
            </td>
            <td>
              <div className="w-36 overflow-hidden ticker-shadow">
                <Link
                  className="text-purple-600 hover:text-purple-400 dark:text-purple-400  dark:hover:text-purple-300"
                  to={`/channels/${vod.StreamerLoginAtStart}`}
                >
                  {vod.StreamerLoginAtStart}
                </Link>
              </div>
            </td>
            <td className="pr-4">
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
