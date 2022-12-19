import { is } from "typescript-json";
import { Res, Streams } from "./type";

export type TFrontPage = Res<unknown>
export const fetchFrontPage = async (
  pubStatus: "public" | "private",
  subStatus: "sub" | "free"
): Promise<TFrontPage> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/all/${pubStatus}/${subStatus}`
    );
    const data = (await response.json()) as unknown;
    if (is<Streams>(data)) {
      return { result: "good", data } as const;
    }
    return { result: "misformatted" } as const;
  } catch {
    return { result: "error" } as const;
  }
};
