import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { Streams as TStreams } from "../type";
import { Streams } from "./Streams";
import { useAtomValue } from "jotai";
import { Filters, publicVods, subOnlyVods } from "./Filters";
import { useQuery } from "@tanstack/react-query";
import { is } from "typia";

export const CategoryPage: FC = () => {
  const publicStatus = useAtomValue(publicVods);
  const subOnlyStatus = useAtomValue(subOnlyVods);
  const category = useLoaderData() as string;
  const queryResponse = useQuery({
    queryKey: ["categories", category, publicStatus, subOnlyStatus],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/category/${category}/all/${publicStatus}/${subOnlyStatus}`
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
      ) : vods.result === "error" || vods.data.length === 0 ? (
        <div className="px-2">
          Category with ID <code>`{category}`</code> not found.
        </div>
      ) : (
        <>
          <div className="font-bold text-base px-2 flex items-center h-6">
            <div className="text-xs font-normal flex">@</div>
            <div>{vods.data[0]?.Metadata.GameNameAtStart}</div>
          </div>
          <div className="overflow-hidden ticker-shadow">
            <Streams vods={vods.data} />
          </div>
        </>
      )}
    </div>
  );
};
