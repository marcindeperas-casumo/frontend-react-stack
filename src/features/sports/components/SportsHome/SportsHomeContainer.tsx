import React from "react";
import { useSelector } from "react-redux";
import { last, sortBy, path } from "ramda";
import { oddsFormatSelector } from "Models/sportsEvents";
import { useLanguage, useLocale, useTranslations } from "Utils/hooks";
import { PopularEvents } from "./PopularEvents";
import {
  SportsHomeConfigurationTranslations,
  SportsHomeTranslationsDictionary,
  WidgetComponent,
} from "./types";
import SportsHomeAdapters from "./SportsHome.adapters";
import SportsHomeUtilities from "./SportsHome.Utilities";
import {
  DEFAULT_NUMBER_OF_EVENTS_TO_SHOW,
  DEFAULT_SPORTS,
  KAMBI_SPORTS_SLUG,
  NUMBER_EVENTS_TO_PULL_MULTIPLIER,
} from "./SportsHome.constants";
import { PopularLiveEvents } from "./PopularLiveEvents";

export const SportsHomeContainer = () => {
  const t = useTranslations<SportsHomeTranslationsDictionary>(
    KAMBI_SPORTS_SLUG
  );

  const configurations = useTranslations<SportsHomeConfigurationTranslations>(
    "sports.sports-home-configuration"
  );

  // get configurations for all sports home widgets
  const sportsHomeConfigurations = SportsHomeAdapters.convertToSportsHomePopularBetsConfiguration(
    configurations,
    DEFAULT_NUMBER_OF_EVENTS_TO_SHOW,
    DEFAULT_SPORTS
  );

  const language = useLanguage();
  const locale = useLocale();
  const oddsFormatEvent = useSelector(oddsFormatSelector);

  // configurations for the popular events widget
  const popularEventsWidgetConfigurations =
    sportsHomeConfigurations.PopularEventsWidgetConfigurations;
  const renderPopularEventsWidget = () => {
    if (!popularEventsWidgetConfigurations.isEnabled) {
      return null;
    }

    return (
      <PopularEvents
        numberOfEvents={
          SportsHomeUtilities.getNumberOfEventsPerDevice(
            popularEventsWidgetConfigurations
          ) * NUMBER_EVENTS_TO_PULL_MULTIPLIER
        }
        numberOfEventsToShow={SportsHomeUtilities.getNumberOfEventsPerDevice(
          popularEventsWidgetConfigurations
        )}
        market={last(locale.split("-"))}
        // sports={popularEventsConfiguration.availableSports}
        sports="FOOTBALL"
        language={language}
        locale={locale}
        t={t}
        oddsFormatEvent={oddsFormatEvent}
      />
    );
  };

  // configurations for the popular live events widget
  const popularLiveEventsWidgetConfigurations =
    sportsHomeConfigurations.PopularEventsWidgetConfigurations;
  const renderPopularLiveEventsWidget = () => {
    if (!popularLiveEventsWidgetConfigurations.isEnabled) {
      return null;
    }

    return (
      <PopularLiveEvents
        numberOfEvents={
          SportsHomeUtilities.getNumberOfEventsPerDevice(
            popularLiveEventsWidgetConfigurations
          ) * NUMBER_EVENTS_TO_PULL_MULTIPLIER
        }
        numberOfEventsToShow={SportsHomeUtilities.getNumberOfEventsPerDevice(
          popularLiveEventsWidgetConfigurations
        )}
        market={last(locale.split("-"))}
        // sports={popularLiveEventsConfiguration.availableSports}
        sports="FOOTBALL"
        language={language}
        locale={locale}
        t={t}
        oddsFormatEvent={oddsFormatEvent}
      />
    );
  };

  const widgets: WidgetComponent[] = [
    {
      component: renderPopularEventsWidget,
      orderNo: popularEventsWidgetConfigurations.orderNo,
    },
    {
      component: renderPopularLiveEventsWidget,
      orderNo: popularLiveEventsWidgetConfigurations.orderNo,
    },
  ];

  const sortedWidgets = sortBy(path(["orderNo"]), widgets);

  return (
    <>
      {sortedWidgets.map((widget, key) => (
        <>
          {widget.component()}
          {key < sortedWidgets.length - 1 ? (
            <div className="u-margin-x--md u-margin-y--sm t-border-top--lg t-border-grey-5 t-border-r--sm" />
          ) : null}
        </>
      ))}
    </>
  );
};
