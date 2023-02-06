import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { FC } from "react";

export const publicVods = atomWithStorage<"public" | "private">(
  "public",
  "private"
);
export const subOnlyVods = atomWithStorage<"sub" | "free">("sub-only", "sub");
export const Filters: FC = () => {
  const [publicStatus, setPublicStatus] = useAtom(publicVods);
  const [subOnlyStatus, setSubOnlyStatus] = useAtom(subOnlyVods);
  return (
    <div className="flex flex-row space-x-0.5 pl-2 text-white dark:text-zinc-950 pb-1 pt-0">
      <button
        onClick={() => {
          setPublicStatus((prev) =>
            prev === "private" ? "public" : "private"
          );
        }}
      >
        <div className="bg-purple-400 hover:bg-purple-500 h-8 items-center w-20 flex justify-center uppercase">
          {publicStatus}
        </div>
      </button>
      <button
        onClick={() => {
          setSubOnlyStatus((prev) => (prev === "free" ? "sub" : "free"));
        }}
      >
        <div className=" bg-purple-400 hover:bg-purple-500 h-8 items-center w-20 flex justify-center uppercase">
          {subOnlyStatus}
        </div>
      </button>
    </div>
  );
};
