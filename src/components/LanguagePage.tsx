import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { TLanguagePage } from "../routes/language";
import { Streams } from "./Streams";

export const LanguagePage: FC = () => {
  const vods = useLoaderData() as TLanguagePage;
  return (
    <div className="py-4 space-y-1">
      {vods.result === "misformatted" ? (
        <div className="px-4">Misformatted response.</div>
      ) : vods.result === "error" ? (
        <div className="px-4">
          Entries for <code>`{vods.language}`</code> not found.
        </div>
      ) : (
        <>
          <div className="font-bold text-base px-4 flex items-center h-6">
            <div className="text-xs font-normal">@</div>
            <div>{vods.data[0]?.Metadata.LanguageAtStart}</div>
          </div>
          <div className="overflow-x-auto">
            <Streams vods={vods.data} />
          </div>
        </>
      )}
    </div>
  );
};
