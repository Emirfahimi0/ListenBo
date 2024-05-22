import { AxiosProgressEvent } from "axios";
import { requestHandler } from "./RequestHandler";
import { client } from "./client";
import { mapRange } from "../utils";

export interface IAudio {
  title: string;
  about: string;
  file: string;
  poster: string;
}

export interface AudioResponse {
  audio: IAudio;
}

export const createAudio = async (formData: FormData, token: string, handleProgress: (value: number) => void) => {
  return requestHandler<FormData, AudioResponse>((requestData) =>
    client.post("/audio/create", requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress(progressEvent: AxiosProgressEvent) {
        const value = mapRange({
          inputMin: 0,
          inputMax: progressEvent.total || 0,
          outputMin: 0,
          outputMax: 100,
          value: progressEvent.loaded || 0,
        });
        return handleProgress(Math.floor(value));
      },
    }),
  )(formData);
};
