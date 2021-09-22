import { useQuery } from "@apollo/client";
import * as sportsHome from "@casumo/sports-home";
import * as React from "react";
import { SPORTS_POPULAR_BETS_QUERY } from "Features/sports/components/SportsHome/SportsHomeQueries";
import { ErrorMessage } from "Components/ErrorMessage";
import { TMarket } from "Src/constants";
import { getKambiSupportedLanguage } from "Features/sports/kambi";
import { useLanguage, useLocale } from "Utils/hooks";
import { getOffering } from "Features/sports/kambi/getKambiOffering";
import SportsHomeService from "./SportsHome.service";

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
}: {
  numberOfEvents: number;
  market?: TMarket;
  sports: string;
}) => {
  const variables = {
    numberOfEvents: numberOfEvents,
    sports: sports,
    market: market,
  };
  const { error, data, refetch } = useQuery(SPORTS_POPULAR_BETS_QUERY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const [kambiLocale, setKambiLocale] = React.useState("en_GB");
  const locale = useLocale();
  React.useEffect(() => {
    if (locale) {
      setKambiLocale(getKambiSupportedLanguage(locale.replace("-", "_")));
    }
  }, [locale]);

  const language = useLanguage();
  const [kambiOffering, setKambiOffering] = React.useState("ca");
  React.useEffect(() => {
    if (language) {
      setKambiOffering(getOffering(language));
    }
  }, [language]);

  const [sportsPopularBetsData, setSportsPopularBetsData] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      if (data?.sportsPopularBets?.popularEvents.length && market) {
        // use data to fetch event details from Kambi Offerrings REST API Data
        const eventIds = data.sportsPopularBets.popularEvents[0].events.map(
          popularEvent => popularEvent.eventId
        );

        const eventIdsArgs = eventIds.join();

        const resultData = await SportsHomeService.getOfferings(
          kambiOffering,
          eventIdsArgs,
          kambiLocale
        );            

        // organise sports data include Kambi Offerrings REST API Data
        setSportsPopularBetsData(resultData);
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
