import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { TChannelPage } from "../routes/channel";
import { Streams } from "./Streams";

export const ChannelPage: FC = () => {
  const vods = useLoaderData() as TChannelPage;
  return (
    <div className="px-5 py-5 space-y-3">
      {vods.result === "misformatted" ? (
        <>Misformatted response.</>
      ) : vods.result === "error" ? (
        <>
          Channel <code>`{vods.channel}`</code> not found.
        </>
      ) : (
        <Streams vods={vods.data} />
      )}
    </div>
  );
};
