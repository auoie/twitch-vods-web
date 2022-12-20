import { is } from "typescript-json";
import { Res, Streams } from "./type";

export type TLanguagePage = Res<{ readonly language: string }>;
export const fetchLanguagePage = async (
  language: string,
  pubStatus: "public" | "private",
  subStatus: "sub" | "free"
): Promise<TLanguagePage> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/language/${language}/all/${pubStatus}/${subStatus}`
    );
    const data = (await response.json()) as unknown;
    if (is<Streams>(data)) {
      return { result: "good", data, language } as const;
    }
    return { result: "misformatted", language } as const;
  } catch {
    return { result: "error", language } as const;
  }
};
