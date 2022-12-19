import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { TFrontPage } from "../routes/front";
import { Streams } from "./Streams";

export const FrontPage: FC = () => {
  const vods = useLoaderData() as TFrontPage;
  return (
    <div className="py-4 space-y-1">
      {vods.result === "misformatted" ? (
        <div className="px-4">Misformatted response.</div>
      ) : vods.result === "error" ? (
        <div className="px-4">Fetch failed.</div>
      ) : (
        <>
          <div className="font-bold text-base px-4">All</div>
          <div className="overflow-x-auto">
            <Streams vods={vods.data} />
          </div>
        </>
      )}
    </div>
  );
};
