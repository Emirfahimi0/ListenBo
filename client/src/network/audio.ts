import { requestHandler } from "./RequestHandler";
import { client } from "./client";

export interface IAudio {
  title: string;
  about: string;
  file: string;
  poster: string;
}

export interface AudioResponse {
  audio: IAudio;
}

export const createAudio = async (formData: FormData, token: string) => {
  return requestHandler<FormData, AudioResponse>((requestData) =>
    client.post("/audio/create", requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  )(formData);
};
