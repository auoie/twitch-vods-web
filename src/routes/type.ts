export type Streams = Stream[];
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
  readonly result: "misformatted";
};
type ResError = {
  readonly result: "error";
};
export type Res<Meta> = (ResGood | ResError | ResMisformatted) & Meta;
