import { is } from "typescript-json";
import { Res, Streams } from "./type";

export type TLanguagePage = Res<unknown>;
export const fetchLanguagePage = async (
  language: string,
  pubStatus: "public" | "private",
  subStatus: "sub" | "free"
): Promise<TLanguagePage> => {
  try {
    const response = await fetch(
      `http://localhost:3000/language/${language}/all/${pubStatus}/${subStatus}`
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
