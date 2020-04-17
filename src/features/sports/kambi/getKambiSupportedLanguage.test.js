import { getKambiSupportedLanguage } from "./getKambiSupportedLanguage";

describe("getKambiSupportedLanguage", () => {
  test("language is supported by Kambi", () => {
    const supportedLang = "es_ES";
    const lang = getKambiSupportedLanguage(supportedLang);

    expect(lang).toEqual(supportedLang);
  });

  test("language is NOT supported by Kambi", () => {
    const notSupportedLang = "en_IN";
    const expectedDefaultLang = "en_GB";
    const lang = getKambiSupportedLanguage(notSupportedLang);

    expect(lang).toEqual(expectedDefaultLang);
  });
});
