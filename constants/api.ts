import config from "config";

export const TEST_URL = "https://jsonplaceholder.typicode.com/users";

export const AUTH_SERVICE_API = {
  postLoginURL: () => `${config.API_URL}/login`,
  getCurrentUserProfileURL: () => `${config.API_URL}/me`,
};
