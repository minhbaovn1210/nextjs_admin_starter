import { initialValues } from "./../../providers/AuthProvider";
import { i18n } from "i18n";
import axios, { AxiosInstance } from "axios";
import Agent from "agentkeepalive";
import _get from "lodash/get";
import { notification } from "antd";

const keepaliveAgent = new Agent({
  maxSockets: 40,
  maxFreeSockets: 10,
});

const defaultOptions = {
  httpAgent: keepaliveAgent,
  HttpsAgent: keepaliveAgent,
  timeout: 60000,
  freeSocketTimeout: 30000,
};

export const createAxiosInstance = (options: any): AxiosInstance => {
  const axiosInstance = axios.create(
    Object.assign({}, defaultOptions, options)
  );
  axiosInstance.defaults.timeout = 30000;

  // Handle exception
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const statusCode = _get(error, "response.status");

      if (statusCode >= 400 && statusCode < 500) {
        const message = _get(error, "response.data.message", "");
        if (message) {
          notification.error({
            message,
          });

          if (statusCode === 401 || message === "Unauthorized") {
            localStorage.setItem(
              "BACK_OFFICE_USER_INFO",
              JSON.stringify(initialValues)
            );

            setTimeout(window.location.reload, 1000);
          }
        }
      } else if (statusCode >= 500) {
        notification.error({
          message: i18n.t("internal-server-error"),
        });

        console.log("error", _get(error, "response.data.message", ""));
      }

      return error.response;
    }
  );

  return axiosInstance;
};
