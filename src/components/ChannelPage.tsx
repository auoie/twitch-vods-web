import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { Res } from "../routes/type";
import { Streams } from "./Streams";

export const ChannelPage: FC = () => {
  const vods = useLoaderData() as Res<{readonly channel: string}>;
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
