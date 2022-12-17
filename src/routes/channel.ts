import { is } from "typescript-json";
import { Res, Streams } from "./type";

export const fetchChannel = async (channelLogin: string): Promise<Res> => {
  try {
    const response = await fetch(
      `http://localhost:3000/channels/${channelLogin}`
    );
    const data = (await response.json()) as unknown;
    if (is<Streams>(data)) {
      return { result: "good", data } as const;
    }
    return { result: "misformatted" } as const;
  } catch {
    return { result: "error", data: channelLogin } as const;
  }
};
