import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { CategoryEntries } from "../type";
import { is } from "typia";
import { Link } from "react-router-dom";

export const CategoryList: FC = () => {
  const queryResponse = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        const data = (await response.json()) as unknown;
        if (is<CategoryEntries>(data)) {
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
    <div className="py-2 mb-48 space-y-2 overflow-hidden">
      {vods.result === "misformatted" ? (
        <div className="px-2">Misformatted response.</div>
      ) : vods.result === "error" ? (
        <div className="px-2">Fetch failed.</div>
      ) : (
        <>
          <div className="font-bold text-base pl-2">
            200 Popular Categories from Past 24 Hours
          </div>
          <div className="overflow-hidden">
            <div className="space-y-2 px-2 overflow-hidden">
              {vods.data.map((value) => (
                <div
                  key={value.GameNameAtStart}
                  className="text-white dark:text-zinc-950"
                >
                  <div className="bg-purple-400 hover:bg-purple-500 flex-col justify-center items-center whitespace-nowrap overflow-hidden">
                    <Link to={`/categories/@${value.GameIDAtStart}`}>
                      <div className="pl-1 py-1">
                        @{value.GameNameAtStart} ({value.Count})
                      </div>
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
