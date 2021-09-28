import { last } from "ramda";
import React from "react";
import { useLanguage, useLocale, useTranslations } from "Utils/hooks";
import { SportsHome } from "./SportsHome";
import { SportsHomeTranslationsDictionary } from "./types";

export const NUMBER_OF_EVENTS = 4;
export const SPORTS = "FOOTBALL";
export const KAMBI_SPORTS_SLUG = "sports.dictionary";

export const SportsHomeContainer = () => {
  const t = useTranslations<SportsHomeTranslationsDictionary>(
    KAMBI_SPORTS_SLUG
  );

  const language = useLanguage();
  const locale = useLocale();

  return (
    <SportsHome
      numberOfEvents={NUMBER_OF_EVENTS}
      market={last(locale.split("-"))}
      sports={SPORTS}
      language={language}
      locale={locale}
      t={t}
    />
  );
};
