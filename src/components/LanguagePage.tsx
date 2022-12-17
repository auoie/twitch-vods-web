import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { Res } from "../routes/type";
import { Streams } from "./Streams";

export const LanguagePage: FC = () => {
  const vods = useLoaderData() as Res<unknown>;
  return (
    <div className="px-5 py-5 space-y-3">
      {vods.result === "misformatted" ? (
        <>Misformatted response.</>
      ) : vods.result === "error" ? (
        <>Fetch failed.</>
      ) : (
        <Streams vods={vods.data} />
      )}
    </div>
  );
};
