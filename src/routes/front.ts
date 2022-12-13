import { is } from "typescript-json";

type Streams = Stream[];
type Stream = {
  StreamerLoginAtStart: string;
  TitleAtStart: string;
  MaxViews: number;
  StartTime: string;
  StreamID: string;
};
type ResGood = {
  readonly result: "good";
  readonly data: Stream[];
};
type ResMisformatted = {
  readonly result: "misformattted";
};
type ResError = {
  readonly result: "error";
};
export type Res = ResGood | ResError | ResMisformatted;
export const fetchFrontPage = async (): Promise<Res> => {
  try {
    const response = await fetch(
      "http://localhost:3000/highest_viewed_private_available"
    );
    const data = (await response.json()) as unknown;
    if (is<Streams>(data)) {
      return { result: "good", data } as const;
    }
    return { result: "misformattted" } as const;
  } catch {
    return { result: "error" } as const;
  }
};
