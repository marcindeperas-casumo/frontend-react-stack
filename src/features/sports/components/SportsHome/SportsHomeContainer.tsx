import { last } from "ramda";
import React from "react";
import { useSelector } from "react-redux";
import { oddsFormatSelector } from "Models/sportsEvents";
import { useLanguage, useLocale, useTranslations } from "Utils/hooks";
import { SportsHome } from "./SportsHome";
import {
  SportsHomeConfigurationTranslations,
  SportsHomeTranslationsDictionary,
} from "./types";
import SportsHomeAdapters from "./SportsHome.adapters";
import SportsHomeUtilities from "./SportsHome.Utilities";
export const DEFAULT_NUMBER_OF_EVENTS_TO_SHOW = 5;
export const NUMBER_EVENTS_TO_PULL_MULTIPLIER = 4;
export const DEFAULT_SPORTS = "FOOTBALL";
export const KAMBI_SPORTS_SLUG = "sports.dictionary";

export const SportsHomeContainer = () => {
  const t = useTranslations<SportsHomeTranslationsDictionary>(
    KAMBI_SPORTS_SLUG
  );

  const configurations = useTranslations<SportsHomeConfigurationTranslations>(
    "sports.sports-home-configuration"
  );

  const popularBetsConfiguration = SportsHomeAdapters.convertToSportsHomePopularBetsConfiguration(
    configurations,
    DEFAULT_NUMBER_OF_EVENTS_TO_SHOW,
    DEFAULT_SPORTS
  );

  const language = useLanguage();
  const locale = useLocale();
  const oddsFormatEvent = useSelector(oddsFormatSelector);

  const isPopularWidgetsEnabled = Boolean(
    JSON.parse(localStorage.getItem("showMostPopularEventsWidget"))
  );

  if (isPopularWidgetsEnabled && popularBetsConfiguration.isEnabled) {
    return (
      <SportsHome
        numberOfEvents={
          SportsHomeUtilities.getNumberOfEventsPerDevice(
            popularBetsConfiguration
          ) * NUMBER_EVENTS_TO_PULL_MULTIPLIER
        }
        numberOfEventsToShow={SportsHomeUtilities.getNumberOfEventsPerDevice(
          popularBetsConfiguration
        )}
        market={last(locale.split("-"))}
        sports={popularBetsConfiguration.availableSports}
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
