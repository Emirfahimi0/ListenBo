// T represents the request, whereas V represents the response from the server.
import { AxiosError, AxiosResponse } from "axios";
type BaseRequest<T, V> = (body?: T) => Promise<AxiosResponse<V>>;

type SuccessResponse<V> = {
  code: "success";
  data: V;
};

type ServerResponse = { error: string };

type ErrorResponse<E = ServerResponse> = {
  code: "error";
  error: E;
};

type BaseResponse<V, E> = Promise<SuccessResponse<V> | ErrorResponse<E>>;

export const requestHandler =
  <T, V, E = AxiosError | ServerResponse>(request: BaseRequest<T, V>) =>
  async (body?: T): BaseResponse<V, E> => {
    // console.log(body);
    try {
      const response = await request(body);
      return { code: "success", data: response.data };
    } catch (e) {
      const axiosError = e as AxiosError;
      const { isAxiosError, response } = axiosError;

      if (isAxiosError && response) {
        const { status, data } = response;
        return { code: "error", error: { status, data } } as ErrorResponse<E>;
      }

      return { code: "error", error: e as E };
    }
  };
