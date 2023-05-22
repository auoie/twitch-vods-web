import { FC } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { TSearchEntries } from "../type";
import { Filters } from "./Filters";
import { useQuery } from "@tanstack/react-query";
import { is } from "typia";
import { ImageOrEmpty } from "./ImageOrEmpty";

export const SearchPage: FC = () => {
  const searchQuery = useLoaderData() as string;
  const queryResponse = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/search/${searchQuery}`
        );
        const data = (await response.json()) as unknown;
        if (is<TSearchEntries>(data)) {
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
          No search results for <code>`{searchQuery}`</code>
        </div>
      ) : (
        <>
          <div className="px-2 pb-2">
            <div className="whitespace-nowrap text-xl">
              <code>`{searchQuery}`</code>
            </div>
          </div>
          <div className="overflow-hidden ticker-shadow">
            <div className="w-full mb-48">
              {vods.data.map((vod) => {
                return (
                  <div
                    key={vod.StreamerLoginAtStart}
                    className="flex flex-row pb-3 pl-2"
                  >
                    <div className="flex flex-row">
                      <Link to={`/channels/@${vod.StreamerLoginAtStart}`}>
                        <ImageOrEmpty
                          src={vod.ProfileImageUrlAtStart.String}
                          className="w-[50px] h-[50px] min-w-[50px] min-h-[50px] hover:shadow-md hover:shadow-purple-400 flex items-center justify-center text-xl select-none"
                        />
                      </Link>
                    </div>
                    <Link
                      className="text-purple-400 hover:text-purple-500 ml-2 text-xl flex items-center"
                      to={`/channels/@${vod.StreamerLoginAtStart}`}
                    >
                      {vod.StreamerLoginAtStart}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
