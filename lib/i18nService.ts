import { parseCookies } from "nookies";

export const getLanguage = (ctx: any) => {
  const cookies = parseCookies(ctx);
  return cookies["next-i18next"] || "en";
};
