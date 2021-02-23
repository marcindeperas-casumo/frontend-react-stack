/* @flow */
import { contains } from "ramda";
import { KAMBI_SUPPORTED_LANGUAGES } from "Features/sports/constants";

export const getKambiSupportedLanguage = (language: string): string =>
  contains(language, KAMBI_SUPPORTED_LANGUAGES) ? language : "en_GB";
