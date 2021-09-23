import { useQuery } from "@apollo/client";
import * as sportsHome from "@casumo/sports-home";
import * as React from "react";
import { SPORTS_POPULAR_BETS_QUERY } from "Features/sports/components/SportsHome/SportsHomeQueries";
import { ErrorMessage } from "Components/ErrorMessage";
import { TMarket } from "Src/constants";
import { getKambiSupportedLanguage } from "Features/sports/kambi";
import { getOffering } from "Features/sports/kambi/getKambiOffering";
import SportsHomeService from "./SportsHome.service";
import SportsHomeAdapters from "./SportsHome.adapters";
import { SportsHomeEvent, SportsHomeTranslations, SportsHomeType } from "./types";

const renderSportsHome = data => {
  return (
    <div>
      <sportsHome.SportsHome text="Popular events" />
    </div>
  );
};

export const SportsHome = ({
  numberOfEvents,
  market,
  sports,
  language,
  locale,
  t,
}: {
  numberOfEvents: number;
  market?: TMarket;
  sports: string;
  language: string;
  locale: string;
  t: SportsHomeTranslations;
}) => {
  const variables = {
    numberOfEvents: numberOfEvents,
    sports: sports,
    market: market,
    language: language,
    locale: locale,
    t: t,
  };
  const { error, data, refetch } = useQuery(SPORTS_POPULAR_BETS_QUERY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const [kambiLocale, setKambiLocale] = React.useState("en_GB");
  React.useEffect(() => {
    if (locale) {
      setKambiLocale(getKambiSupportedLanguage(locale.replace("-", "_")));
    }
  }, [locale]);

  const [kambiOffering, setKambiOffering] = React.useState("ca");
  React.useEffect(() => {
    if (language) {
      setKambiOffering(getOffering(language));
    }
  }, [language]);

  const [sportsPopularBetsData, setSportsPopularBetsData] = React.useState<SportsHomeType>();

  React.useEffect(() => {
    const fetchData = async () => {
      if (data?.sportsPopularBets?.popularEvents.length && market) {
        // use data to fetch event details from Kambi Offerrings REST API Data
        const eventIds = data.sportsPopularBets.popularEvents[0].events.map(
          popularEvent => popularEvent.eventId
        );

        const eventIdsArgs = eventIds.join();

        const kambiOfferings = await SportsHomeService.getOfferings(
          kambiOffering,
          eventIdsArgs,
          kambiLocale
        );
        
        const offerringData = SportsHomeAdapters.convertToSportsHomeOfferings(kambiOfferings.data.events, kambiOfferings.data.betOffers);
        
        const sportsHomeType = {
          events: offerringData,
          fractional: true,
          locale: locale,
          translations: t
        } as SportsHomeType;

        // organise sports data include Kambi Offerrings REST API Data
        setSportsPopularBetsData(sportsHomeType);
      }
    };
    fetchData();
  }, [data, market]);

  if (error) {
    return <ErrorMessage direction="horizontal" />;
  }

  if (data && !data.sportsPopularBets.popularEvents.length) {
    return (
      <ErrorMessage
        direction="horizontal"
        //retry={() => clickRetryRefetchNavigation()}
      />
    );
  }

  return renderSportsHome(null);
};

