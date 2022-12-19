import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { TFrontPage } from "../routes/front";
import { Streams } from "./Streams";

export const FrontPage: FC = () => {
  const vods = useLoaderData() as TFrontPage;
  return (
    <div className="px-4 py-4 space-y-1">
      {vods.result === "misformatted" ? (
        <>Misformatted response.</>
      ) : vods.result === "error" ? (
        <>Fetch failed.</>
      ) : (
        <>
          <div className="font-bold text-base">All</div>
          <div className="overflow-x-auto">
            <Streams vods={vods.data} />
          </div>
        </>
      )}
    </div>
  );
};
