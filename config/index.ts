import { get } from "lodash";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig() || {};
const APP_ENV = get(publicRuntimeConfig, "APP_ENV", "");

type Config = {
  API_URL: string;
  TINYMCE_KEY: string;
};

let config: Config = {
  API_URL: "https://api-dev.domail.com",
  TINYMCE_KEY: "rmyfkeboqb2jyirns3v49czk72gpt94owyujc4rpcmei6pzf",
};

// Production only
if (APP_ENV) {
  switch (APP_ENV) {
    case "dev":
      config = {
        API_URL: "https://api-dev.domail.com",
        TINYMCE_KEY: "rmyfkeboqb2jyirns3v49czk72gpt94owyujc4rpcmei6pzf",
      };
      break;
    case "staging":
      config = {
        API_URL: "https://api-staging.domail.com",
        TINYMCE_KEY: "rmyfkeboqb2jyirns3v49czk72gpt94owyujc4rpcmei6pzf",
      };
      break;
    case "prod":
      config = {
        API_URL: "https://api.domail.com",
        TINYMCE_KEY: "rmyfkeboqb2jyirns3v49czk72gpt94owyujc4rpcmei6pzf",
      };
      break;
    default:
      break;
  }
}

export default config;
