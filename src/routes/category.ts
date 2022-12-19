import { is } from "typescript-json";
import { Res, Streams } from "./type";

export type TCategoryPage = Res<unknown>;
export const fetchCategoryPage = async (
  categoryId: string,
  pubStatus: "public" | "private",
  subStatus: "sub" | "free"
): Promise<TCategoryPage> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/category/${categoryId}/all/${pubStatus}/${subStatus}`
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
