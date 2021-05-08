import { AxiosInstance, AxiosRequestConfig } from "axios";
import { createAxiosInstance } from "./axios";

export const axiosInstance = createAxiosInstance({
  headers: {
    "Content-Type": "application/json",
  },
});

const wrapClientWithContext = (client: AxiosInstance, ctx: any) => {
  const bearerToken = client.defaults.headers.common["Authorization"];
  const defaultOptions = {
    headers: {
      Authorization: bearerToken,
    },
  };

  return {
    get: (url: string, options: AxiosRequestConfig = {}) =>
      client.get(url, { ...defaultOptions, ...options }),
    post: (url: string, data: any, options: AxiosRequestConfig = {}) =>
      client.post(url, data, { ...defaultOptions, ...options }),
    put: (url: string, data: any, options: AxiosRequestConfig = {}) =>
      client.put(url, data, { ...defaultOptions, ...options }),
    patch: (url: string, data: any, options: AxiosRequestConfig = {}) =>
      client.patch(url, data, { ...defaultOptions, ...options }),
    delete: (url: string, options: AxiosRequestConfig = {}) =>
      client.delete(url, { ...defaultOptions, ...options }),
  };
};

const HttpService = (ctx: any = null) =>
  wrapClientWithContext(axiosInstance, ctx);
export default HttpService;
