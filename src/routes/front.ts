import { is } from "typescript-json";

type Streams = Stream[];
type Stream = {
  Link: string;
  Metadata: Metadata;
};
type Metadata = {
  ID: string;
  MaxViews: number;
  StartTime: string;
  StreamerID: string;
  StreamID: string;
  StreamerLoginAtStart: string;
  GameNameAtStart: string;
  LanguageAtStart: string;
  TitleAtStart: string;
  IsMatureAtStart: boolean;
  GameIDAtStart: string;
  BytesFound: BytesFound;
  Public: Public;
  SubOnly: SubOnly;
  HlsDurationSeconds: HlsDurationSeconds;
};
type BytesFound = {
  Bool: boolean;
  Valid: boolean;
};
type Public = {
  Bool: boolean;
  Valid: boolean;
};
type SubOnly = {
  Bool: boolean;
  Valid: boolean;
};
type HlsDurationSeconds = {
  Float64: number;
  Valid: boolean;
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
    const response = await fetch("http://localhost:3000/all/private/sub");
    const data = (await response.json()) as unknown;
    if (is<Streams>(data)) {
      return { result: "good", data } as const;
    }
    return { result: "misformattted" } as const;
  } catch {
    return { result: "error" } as const;
  }
};
