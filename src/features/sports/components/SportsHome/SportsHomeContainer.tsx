import React from "react";
import { useSelector } from "react-redux";
import { last, sortBy, path } from "ramda";
import { oddsFormatSelector } from "Models/sportsEvents";
import {
  useLanguage,
  useLocale,
  useMarket,
  useTranslations,
} from "Utils/hooks";
import { STRAPI_LOCALES } from "Src/constants";
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
  DEFAULT_STARTING_WITHIN_DAYS,
} from "./SportsHome.constants";
import { PopularLiveEvents } from "./PopularLiveEvents";
import { PromoCards } from "./PromoCards";

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
    DEFAULT_SPORTS,
    DEFAULT_STARTING_WITHIN_DAYS
  );

  const language = useLanguage();
  const locale = useLocale();
  const market = useMarket();
  const oddsFormatEvent = useSelector(oddsFormatSelector);

  // configurations for the popular events widget
  const popularEventsWidgetConfigurations =
    sportsHomeConfigurations.PopularEventsWidgetConfigurations;
  const renderPopularEventsWidget = () => {
    if (!popularEventsWidgetConfigurations.isEnabled || !t) {
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
        startingWithinDays={
          popularEventsWidgetConfigurations.startingWithinDays
        }
        market={last(locale.split("-"))}
        sports={popularEventsWidgetConfigurations.availableSports}
        language={language}
        locale={locale}
        t={t}
        oddsFormatEvent={oddsFormatEvent}
        title={popularEventsWidgetConfigurations.title}
      />
    );
  };

  // configurations for the popular live events widget
  const popularLiveEventsWidgetConfigurations =
    sportsHomeConfigurations.PopularLiveEventsWidgetConfigurations;
  const renderPopularLiveEventsWidget = () => {
    if (!popularLiveEventsWidgetConfigurations.isEnabled || !t) {
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
        startingWithinDays={
          popularLiveEventsWidgetConfigurations.startingWithinDays
        }
        market={last(locale.split("-"))}
        sports={popularLiveEventsWidgetConfigurations.availableSports}
        language={language}
        locale={locale}
        t={t}
        oddsFormatEvent={oddsFormatEvent}
        title={popularLiveEventsWidgetConfigurations.title}
      />
    );
  };

  // configurations for promo cards
  const isPromoCardsWidgetEnabled = Boolean(
    JSON.parse(localStorage.getItem("showPromoCardsWidget"))
  );

  const promoCardsWidgetConfigurations =
    sportsHomeConfigurations.PromoCardsWidgetConfigurations;

  const renderPromoCardsWidget = () => {
    if (
      !promoCardsWidgetConfigurations.isEnabled ||
      !isPromoCardsWidgetEnabled
    ) {
      return null;
    }

    return (
      <PromoCards
        locale={STRAPI_LOCALES[market]}
        market={last(locale.split("-"))}
        language={language}
        tcDisclaimer={promoCardsWidgetConfigurations.tcDisclaimer}
      />
    );
  };

  const widgets: WidgetComponent[] = [
    {
      component: renderPopularEventsWidget,
      orderNo: popularEventsWidgetConfigurations.orderNo,
      isEnabled: popularEventsWidgetConfigurations.isEnabled,
    },
    {
      component: renderPopularLiveEventsWidget,
      orderNo: popularLiveEventsWidgetConfigurations.orderNo,
      isEnabled: popularLiveEventsWidgetConfigurations.isEnabled,
    },
    {
      component: renderPromoCardsWidget,
      orderNo: promoCardsWidgetConfigurations.orderNo,
      isEnabled: promoCardsWidgetConfigurations.isEnabled,
    },
  ];

  const sortedWidgets = sortBy(path(["orderNo"]), widgets);

  return (
    <>
      {sortedWidgets.map((widget, key) => (
        <>
          {widget.component()}
          {key < sortedWidgets.length - 1 && widget.isEnabled ? (
            <div className="u-margin-x--md u-margin-y--sm t-border-top--lg t-border-grey-5 t-border-r--sm" />
          ) : null}
        </>
      ))}
    </>
  );
};
