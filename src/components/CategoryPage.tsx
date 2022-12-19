import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { TCategoryPage } from "../routes/category";
import { Streams } from "./Streams";

export const CategoryPage: FC = () => {
  const vods = useLoaderData() as TCategoryPage;
  return (
    <div className="px-4 py-4 space-y-1">
      {vods.result === "misformatted" ? (
        <>Misformatted response.</>
      ) : vods.result === "error" ? (
        <>Fetch failed.</>
      ) : (
        <>
          <div className="font-bold text-base">
            {vods.data[0]?.Metadata.GameNameAtStart}
          </div>
          <div className="overflow-x-auto">
            <Streams vods={vods.data} />
          </div>
        </>
      )}
    </div>
  );
};
