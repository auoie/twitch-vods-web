import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { TLanguagePage } from "../routes/language";
import { Streams } from "./Streams";

export const LanguagePage: FC = () => {
  const vods = useLoaderData() as TLanguagePage;
  return (
    <div className="py-2 space-y-1">
      {vods.result === "misformatted" ? (
        <div className="px-2">Misformatted response.</div>
      ) : vods.result === "error" ? (
        <div className="px-2">
          Entries for <code>`{vods.language}`</code> not found.
        </div>
      ) : (
        <>
          <div className="font-bold text-base px-2 flex items-center h-6">
            <div className="text-xs font-normal">@</div>
            <div>{vods.data[0]?.Metadata.LanguageAtStart}</div>
          </div>
          <div className="overflow-hidden ticker-shadow">
            <Streams vods={vods.data} />
          </div>
        </>
      )}
    </div>
  );
};
