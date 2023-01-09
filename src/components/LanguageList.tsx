import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { LanguageEntries } from "../type";
import { is } from "typia";
import { Link } from "react-router-dom";

export const LanguageList: FC = () => {
  const queryResponse = useQuery({
    queryKey: ["languages"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/languages`
        );
        const data = (await response.json()) as unknown;
        if (is<LanguageEntries>(data)) {
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
        <pre className="px-2 py-2 ">Loading...</pre>
      </div>
    );
  }
  return (
    <div className="py-2 space-y-1 overflow-hidden">
      {vods.result === "misformatted" ? (
        <div className="px-2">Misformatted response.</div>
      ) : vods.result === "error" ? (
        <div className="px-2">Fetch failed.</div>
      ) : (
        <>
          <div className="font-bold text-base pl-2">Languages</div>
          <div className="overflow-hidden">
            <div className="grid grid-cols-3 sm:grid-cols-4 mt-1 gap-2">
              {vods.data.map((value) => (
                <div
                  key={value.LanguageAtStart}
                  className="px-2 text-white dark:text-zinc-950"
                >
                  <div className="bg-purple-400 hover:bg-purple-500 pl-1 py-1 flex-col justify-center items-center w-20 uppercase">
                    <Link
                      to={`/languages/@${value.LanguageAtStart}`}
                      className="flex-shrink-0"
                    >
                      <div>@{value.LanguageAtStart}</div>
                      <div>{value.Count}</div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
