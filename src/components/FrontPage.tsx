import { FC } from "react";
import { Streams } from "./Streams";
import { useAtomValue } from "jotai";
import { useQuery } from "@tanstack/react-query";
import { Streams as TStreams } from "../type";
import { is } from "typia";
import { Filters, publicVods } from "./Filters";

export const FrontPage: FC = () => {
  const publicStatus = useAtomValue(publicVods);
  const queryResponse = useQuery({
    queryKey: [publicStatus],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/all/${publicStatus}`
        );
        const data = (await response.json()) as unknown;
        if (is<TStreams>(data)) {
          return { result: "good", data } as const;
        }
        return { result: "misformatted" } as const;
      } catch {
        return { result: "error" } as const;
      }
    },
  });
  const vods = queryResponse.data;
  if (vods === undefined || queryResponse.isLoading) {
    return (
      <div className="py-2 space-y-1 overflow-hidden">
        <Filters />
        <pre className="px-2 py-2 ">Loading...</pre>
      </div>
    );
  }
  return (
    <div className="py-2 space-y-1 overflow-hidden">
      <Filters />
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
