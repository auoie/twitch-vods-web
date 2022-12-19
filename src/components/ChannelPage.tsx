import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { TChannelPage } from "../routes/channel";
import { Streams } from "./Streams";

export const ChannelPage: FC = () => {
  const vods = useLoaderData() as TChannelPage;
  return (
    <div className="px-4 py-4 space-y-1">
      {vods.result === "misformatted" ? (
        <>Misformatted response.</>
      ) : vods.result === "error" ? (
        <>
          Channel <code>`{vods.channel}`</code> not found.
        </>
      ) : (
        <>
          <div className="font-bold text-base">
            {vods.data[0]?.Metadata.StreamerLoginAtStart}
          </div>
          <div className="overflow-x-auto">
            <Streams vods={vods.data} />
          </div>
        </>
      )}
    </div>
  );
};
