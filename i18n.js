const NextI18Next = require("next-i18next").default;
const path = require("path");

const languages = ["en-US", "vi-VN"];

const NextI18NextInstance = new NextI18Next({
  browserLanguageDetection: true,
  serverLanguageDetection: true,
  defaultNS: "common",
  defaultLanguage: languages[0],
  otherLanguages: languages.slice(1),
  localePath: path.resolve("./public/locales"),
});

NextI18NextInstance.languages = languages;
module.exports = NextI18NextInstance;
