import { is } from "typescript-json";

type Streams = Stream[];
type Stream = {
  Link: string;
  Metadata: Metadata;
};
type Metadata = {
  ID: string;
  LastUpdatedAt: string;
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
  LastUpdatedMinusStartTimeSeconds: number;
  RecordingFetchedAt: RecordingFetchedAt;
  HlsDomain: HlsDomain;
  BytesFound: BytesFound;
  SeekPreviewsDomain: SeekPreviewsDomain;
  Public: Public;
  SubOnly: SubOnly;
  HlsDurationSeconds: HlsDurationSeconds;
};
type RecordingFetchedAt = {
  Time: string;
  Valid: boolean;
};
type HlsDomain = {
  String: string;
  Valid: boolean;
};
type BytesFound = {
  Bool: boolean;
  Valid: boolean;
};
type SeekPreviewsDomain = {
  String: string;
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
export const fetchChannel = async (channelLogin: string): Promise<Res> => {
  try {
    const response = await fetch(
      `http://localhost:3000/channels/${channelLogin}`
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
