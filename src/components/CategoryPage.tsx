import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { TCategoryPage } from "../routes/category";
import { Streams } from "./Streams";

export const CategoryPage: FC = () => {
  const vods = useLoaderData() as TCategoryPage;
  return (
    <div className="py-4 space-y-1">
      {vods.result === "misformatted" ? (
        <div className="px-4">Misformatted response.</div>
      ) : vods.result === "error" ? (
        <div className="px-4">Fetch failed.</div>
      ) : (
        <>
          <div className="font-bold text-base px-4">
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
