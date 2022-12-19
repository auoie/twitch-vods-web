import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { TLanguagePage } from "../routes/language";
import { Streams } from "./Streams";

export const LanguagePage: FC = () => {
  const vods = useLoaderData() as TLanguagePage;
  return (
    <div className="px-4 py-4 space-y-1">
      {vods.result === "misformatted" ? (
        <>Misformatted response.</>
      ) : vods.result === "error" ? (
        <>Fetch failed.</>
      ) : (
        <>
          <div className="font-bold text-base">
            {vods.data[0]?.Metadata.LanguageAtStart}
          </div>
          <div className="overflow-x-auto">
            <Streams vods={vods.data} />
          </div>
        </>
      )}
    </div>
  );
};
