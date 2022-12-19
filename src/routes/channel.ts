import { is } from "typescript-json";
import { Res, Streams } from "./type";

export type TChannelPage = Res<{ readonly channel: string }>;
export const fetchChannel = async (
  channelLogin: string
): Promise<TChannelPage> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/channels/${channelLogin}`
    );
    const data = (await response.json()) as unknown;
    if (is<Streams>(data)) {
      return { result: "good", data, channel: channelLogin } as const;
    }
    return { result: "misformatted", channel: channelLogin } as const;
  } catch {
    return { result: "error", channel: channelLogin } as const;
  }
};
