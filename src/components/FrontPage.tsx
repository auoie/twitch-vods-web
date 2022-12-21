import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { TFrontPage } from "../routes/front";
import { Streams } from "./Streams";

export const FrontPage: FC = () => {
  const vods = useLoaderData() as TFrontPage;
  return (
    <div className="py-2 space-y-1">
      {vods.result === "misformatted" ? (
        <div className="px-2">Misformatted response.</div>
      ) : vods.result === "error" ? (
        <div className="px-2">Fetch failed.</div>
      ) : (
        <>
          <div className="font-bold text-base px-2">All</div>
          <div className="overflow-hidden ticker-shadow">
            <Streams vods={vods.data} />
          </div>
        </>
      )}
    </div>
  );
};
