export type Streams = Stream[];
type Stream = {
  Link: string;
  Metadata: Metadata;
};
export type Metadata = {
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
  HlsDurationSeconds: HlsDurationSeconds;
  BoxArtUrlAtStart: BoxArtUrlAtStart;
  ProfileImageUrlAtStart: ProfileImageUrlAtStart;
};
type BoxArtUrlAtStart = {
  String: string;
  Valid: boolean;
};
type ProfileImageUrlAtStart = {
  String: string;
  Valid: boolean;
};
type BytesFound = {
  Bool: boolean;
  Valid: boolean;
};
type Public = {
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
export type LanguageEntries = LanguageEntry[];
export type LanguageEntry = {
  Count: number;
  LanguageAtStart: string;
};

export type CategoryEntries = CategoryEntry[];
export interface CategoryEntry {
  Count: number;
  GameNameAtStart: string;
  GameIDAtStart: string;
}
export type TSearchEntries = TSearchEntry[];
export interface TSearchEntry {
  ProfileImageUrlAtStart: ProfileImageUrlAtStart;
  StreamerLoginAtStart: string;
}

export type Res<Meta> = (ResGood | ResError | ResMisformatted) & Meta;
