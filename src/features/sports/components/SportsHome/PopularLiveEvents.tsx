import { useQuery } from "@apollo/client";
import * as React from "react";
import * as sportsHome from "@casumo/sports-home";
import tracker from "Services/tracker";
import { OddsFormatEvent } from "Models/sportsEvents/sportsEvents.types";
import { SPORTS_POPULAR_BETS_QUERY } from "Features/sports/components/SportsHome/SportsHomeQueries";
import { ErrorMessage } from "Components/ErrorMessage";
import {
  getKambiSupportedLanguage,
  getKambiWidgetAPI,
} from "Features/sports/kambi";
import { getOffering } from "Features/sports/kambi/getKambiOffering";
import { EVENT_PROPS, EVENTS } from "Src/constants";
import {
  socket,
  subscribe,
  unsubscribe,
  setVars,
  messageEvent,
} from "./SportsHomeSocket";
import SportsHomeService from "./SportsHome.service";
import SportsHomeAdapters from "./SportsHome.adapters";
import { SportsHomeTranslationsDictionary, SportsHomeType } from "./types";

const BETSLIP_OUTCOMES = "BetslipOutcomes";
const eventClick = async (eventId: number) => {
  const wapi = await getKambiWidgetAPI();

  wapi.navigateClient(`event/${eventId}`);
};

const outcomeClick = async (
  outcomeId: number,
  selected: boolean,
  market: string,
  component: string
) => {
  const wapi = await getKambiWidgetAPI();

  if (selected) {
    wapi.set(wapi.BETSLIP_OUTCOMES_REMOVE, { outcomes: [outcomeId] });
    tracker.track(EVENTS.MIXPANEL_SPORTS_REMOVED_FROM_BETSLIP_CASUMO, {
      [EVENT_PROPS.SPORTS_OUTCOME_ID]: outcomeId,
      [EVENT_PROPS.MARKET]: market,
      [EVENT_PROPS.SPORTS_COMPONENT]: component,
    });
  } else {
    wapi.set(wapi.BETSLIP_OUTCOMES, {
      updateMode: wapi.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND,
      outcomes: [outcomeId],
      couponType: wapi.BETSLIP_OUTCOMES_ARGS.TYPE_COMBINATION,
    });
    tracker.track(EVENTS.MIXPANEL_SPORTS_ADD_TO_BETSLIP_CASUMO, {
      [EVENT_PROPS.SPORTS_OUTCOME_ID]: outcomeId,
      [EVENT_PROPS.MARKET]: market,
      [EVENT_PROPS.SPORTS_COMPONENT]: component,
    });
  }
};

const renderPopularLiveEvents = (
  data: SportsHomeType,
  numberOfEventsToShow: number,
  betslipOutcomesIds: number[],
  market: string
) => {
  if (!data) {
    return null;
  } else {
    return (
      <div>
        <sportsHome.SportsHome
          events={data?.events}
          betslipOutcomesIds={betslipOutcomesIds}
          numberOfEventsToShow={numberOfEventsToShow}
          oddsFormat={data.oddsFormat}
          translations={data.translations}
          locale={data.locale}
          eventClick={eventClick}
          outcomeClick={(outcomeId, selected) =>
            outcomeClick(outcomeId, selected, market, "popular")
          }
        />
        <div className="hover:bg-grey-20 display-none" />
      </div>
    );
  }
};

export const getOfferingData = async (
  eventIds: number[],
  kambiOffering: string,
  kambiLocale: string,
  market: string
) => {
  const eventIdsArgs = eventIds.join();

  const kambiOfferings = await SportsHomeService.getEvents(
    kambiOffering,
    eventIdsArgs,
    kambiLocale,
    market
  );

  const kambiLiveEvents = await SportsHomeService.getLiveEvents(
    kambiOffering,
    eventIdsArgs,
    kambiLocale
  );

  return SportsHomeAdapters.convertToSportsHomeOfferings(
    eventIds,
    kambiOfferings.data.events,
    kambiOfferings.data.betOffers,
    kambiLiveEvents.data.liveData
  );
};

// eslint-disable-next-line max-lines-per-function
export const PopularLiveEvents = ({
  numberOfEvents,
  numberOfEventsToShow,
  market,
  sports,
  language,
  locale,
  t,
  oddsFormatEvent,
  title,
}: {
  numberOfEvents: number;
  numberOfEventsToShow: number;
  market?: string;
  sports: string;
  language: string;
  locale: string;
  t: SportsHomeTranslationsDictionary;
  oddsFormatEvent: OddsFormatEvent;
  title: string;
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const variables = {
    numberOfEvents: numberOfEvents,
    numberOfEventsToShow: numberOfEventsToShow,
    sports: sports,
    market: market,
    language: language,
    locale: locale,
    t: t,
    oddsFormatEvent: oddsFormatEvent,
  };
  const { error, data, refetch } = useQuery(SPORTS_POPULAR_BETS_QUERY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const [kambiLocale, setKambiLocale] = React.useState("en_GB");
  React.useEffect(() => {
    if (locale) {
      setKambiLocale(getKambiSupportedLanguage(locale.replace("-", "_")));
      setVars("lang", locale.substr(0, 2));
    }
  }, [locale]);

  const [kambiOffering, setKambiOffering] = React.useState("ca");
  React.useEffect(() => {
    if (language) {
      setKambiOffering(getOffering(language));
      setVars("offering", getOffering(language));
    }
  }, [language]);

  const [
    sportsPopularBetsData,
    setSportsPopularBetsData,
  ] = React.useState<SportsHomeType>();

  const [betslipOutcomesIds, setBetslipOutcomesIds] = React.useState<number[]>(
    []
  );

  React.useEffect(() => {
    socket.open();
    subscribe();
    return () => {
      unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    const handleWapiEvent = ev => {
      if (ev.type === BETSLIP_OUTCOMES && ev?.data?.outcomes) {
        setBetslipOutcomesIds(ev.data.outcomes.map(outcome => outcome.id));
      }
    };
    const subscribeBetslip = async () => {
      const wapi = await getKambiWidgetAPI();
      const func = wapi.subscribe(handleWapiEvent);
      wapi.request(wapi.BETSLIP_OUTCOMES);

      return func;
    };

    const unsubscribeBetslip = subscribeBetslip();

    return async () => (await unsubscribeBetslip).unsubscribe();
  }, []);

  React.useEffect(() => {
    // reload one event from kambi offering API when needed
    const getOneEvent = (eventId: number) => {
      const oneEventArray = getOfferingData(
        [eventId],
        kambiOffering,
        kambiLocale,
        market
      );

      oneEventArray.then(eventArray => {
        const oneEvent = eventArray[0];

        if (oneEvent) {
          const indexOfEvent = sportsPopularBetsData.events
            .map(ev => ev.id)
            .indexOf(eventId);
          // eslint-disable-next-line fp/no-mutation
          sportsPopularBetsData.events[indexOfEvent] = oneEvent;

          setSportsPopularBetsData({
            translations: sportsPopularBetsData.translations,
            events: sportsPopularBetsData.events,
            oddsFormat: sportsPopularBetsData.oddsFormat,
            locale: sportsPopularBetsData.locale,
          });
        }
      });
    };

    const listener = dataSocket => {
      messageEvent(
        JSON.parse(dataSocket),
        setSportsPopularBetsData,
        sportsPopularBetsData,
        refetch,
        numberOfEventsToShow,
        getOneEvent
      );
    };
    socket.on("message", listener);
    return () => {
      socket.off("message", listener);
    };
  }, [
    sportsPopularBetsData,
    refetch,
    numberOfEventsToShow,
    kambiOffering,
    kambiLocale,
    market,
  ]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (data?.sportsPopularBets?.popularEvents.length && market) {
        // use data to fetch event details from Kambi Offerrings REST API Data
        const eventIds = data.sportsPopularBets.popularEvents[1]?.events?.map(
          popularEvent => popularEvent.eventId
        );

        const offering = await getOfferingData(
          eventIds,
          kambiOffering,
          kambiLocale,
          market
        );

        const sportsHomeType = {
          events: offering,
          oddsFormat: oddsFormatEvent.oddsFormat,
          locale: locale,
          translations: SportsHomeAdapters.convertToSportsHomeTranslations(
            t,
            title
          ),
        } as SportsHomeType;

        // organise sports data include Kambi Offerrings REST API Data
        setSportsPopularBetsData(sportsHomeType);
      }
    };
    fetchData();
  }, [
    data,
    kambiLocale,
    kambiOffering,
    locale,
    market,
    oddsFormatEvent.oddsFormat,
    t,
    title,
  ]);

  if (error || !data?.sportsPopularBets.popularEvents.length) {
    return <ErrorMessage direction="horizontal" />;
  }

  return renderPopularLiveEvents(
    sportsPopularBetsData,
    Math.min(
      numberOfEventsToShow,
      sportsPopularBetsData?.events ? sportsPopularBetsData?.events.length : 0
    ),
    betslipOutcomesIds,
    market
  );
};
