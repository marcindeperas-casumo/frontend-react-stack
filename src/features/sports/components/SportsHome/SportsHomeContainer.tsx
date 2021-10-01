import { last } from "ramda";
import React from "react";
import { useSelector } from "react-redux";
import { oddsFormatSelector } from "Models/sportsEvents/sportsEvents.selectors";
import { useLanguage, useLocale, useTranslations } from "Utils/hooks";
import { SportsHome } from "./SportsHome";
import { SportsHomeTranslationsDictionary } from "./types";

export const NUMBER_OF_EVENTS_TO_GET = 20;
export const NUMBER_OF_EVENTS_TO_SHOW = 5;
export const SPORTS = "FOOTBALL";
export const KAMBI_SPORTS_SLUG = "sports.dictionary";

export const SportsHomeContainer = () => {
  const t = useTranslations<SportsHomeTranslationsDictionary>(
    KAMBI_SPORTS_SLUG
  );

  const language = useLanguage();
  const locale = useLocale();
  const oddsFormatEvent = useSelector(oddsFormatSelector);

  const isPopularWidgetsEnabled = Boolean(
    JSON.parse(localStorage.getItem("showMostPopularEventsWidget"))
  );

  if (isPopularWidgetsEnabled) {
    return (
      <SportsHome
        numberOfEvents={NUMBER_OF_EVENTS_TO_GET}
        numberOfEventsToShow={NUMBER_OF_EVENTS_TO_SHOW}
        market={last(locale.split("-"))}
        sports={SPORTS}
        language={language}
        locale={locale}
        t={t}
        oddsFormatEvent={oddsFormatEvent}
      />
    );
  } else {
    return null;
  }
};
