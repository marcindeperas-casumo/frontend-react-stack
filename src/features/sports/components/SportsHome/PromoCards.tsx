import { useQuery } from "@apollo/client";
import { SportsPromo } from "@casumo/sports-promo";
import * as React from "react";
import { DateTime } from "luxon";
import tracker from "Services/tracker";
import { EVENT_PROPS, EVENTS } from "Src/constants";
import { SPORTS_PROMO_CARDS_QUERY } from "Features/sports/components/SportsHome/SportsHomeQueries";
import {
  getKambiSupportedLanguage,
  getKambiWidgetAPI,
} from "Features/sports/kambi";
import { getOffering } from "Features/sports/kambi/getKambiOffering";
import DangerousHtml from "Components/DangerousHtml";
import {
  KambiBetOfferOutcome,
  KambiLandingEventResponse,
  PromoCardsType,
} from "./types";
import SportsHomeAdapters from "./SportsHome.adapters";
import {
  KAMBI_NEXTOFF_EVENT_NAME,
  KAMBI_NEXTOFF_EVENT_URL,
  OUTCOME_STATUS_OPEN,
  PROMOCARDS_TYPE_DEEP_LINK,
  PROMOCARDS_TYPE_DIRECT_LINK,
  PROMOCARDS_TYPE_LINK,
  PROMOCARDS_TYPE_NEXTOFF,
} from "./SportsHome.constants";
import SportsHomeService from "./SportsHome.service";

const trackClick = (typeText: string) => {
  tracker.track(EVENTS.MIXPANEL_SPORTS_HOME_CARD_CLICKED, {
    [EVENT_PROPS.TYPE]: typeText,
    [EVENT_PROPS.SPORTS_COMPONENT]: "casumo promo cards",
  });
};

const onClick = async (
  url: string,
  type: string,
  title: string = "no title for this card"
) => {
  const wapi = await getKambiWidgetAPI();

  if ([PROMOCARDS_TYPE_DEEP_LINK, PROMOCARDS_TYPE_DIRECT_LINK].includes(type)) {
    trackClick(`CoreUX Promo Card: ${type} - ${title}`);
    wapi.navigateClient(url);
  }

  if (type === PROMOCARDS_TYPE_NEXTOFF) {
    trackClick("CoreUX Promo Card: Starting Within");
    wapi.navigateClient(KAMBI_NEXTOFF_EVENT_URL);
  }

  if (type === PROMOCARDS_TYPE_LINK) {
    trackClick(`CoreUX Promo Card: Link - ${url}`);
    // eslint-disable-next-line fp/no-mutation
    window.location.href = url;
  }
};

const renderPromoCards = (data: PromoCardsType, tcDisclaimer: string) => {
  if (!data) {
    return null;
  }

  return (
    <div>
      <SportsPromo promoCards={data?.promoCards} />
      {tcDisclaimer && tcDisclaimer.length > 0 && (
        <div className="ml-md">
          <DangerousHtml html={tcDisclaimer} />
        </div>
      )}
    </div>
  );
};

const isValidNextOffEvent = (
  nextOffEvent: KambiLandingEventResponse,
  locale: string
) => {
  return DateTime.fromISO(nextOffEvent.start)
    .setLocale(locale)
    .hasSame(DateTime.local(), "day");
};

const extractPromoCardOutcomeIds = (promoCard: any): number[] => {
  return promoCard.Fragment.length > 1
    ? promoCard.Fragment.split("|")?.[1].split(",").map(Number)
    : [];
};

const generateOutcomeIdsQueryString = (promoCards: any[]): string => {
  const outcomeIds = promoCards.map(x =>
    x.Fragment.length > 1 ? x.Fragment.split("|")?.[1] : ""
  );

  const uniqueOutComeIds = [...new Set(outcomeIds.join().split(","))];

  return uniqueOutComeIds.join("&id=");
};

function flatten(a: KambiBetOfferOutcome[], b: KambiBetOfferOutcome[]) {
  return a.concat(b);
}

export const PromoCards = ({
  locale,
  market,
  language,
  tcDisclaimer,
}: {
  locale: string;
  market: string;
  language: string;
  tcDisclaimer: string;
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const variables = {
    locale: locale,
    market: market,
    language: language,
    tcDisclaimer: tcDisclaimer,
  };

  const { error, data } = useQuery(SPORTS_PROMO_CARDS_QUERY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const [kambiLocale, setKambiLocale] = React.useState("en_GB");
  React.useEffect(() => {
    if (locale) {
      setKambiLocale(getKambiSupportedLanguage(locale.replace("-", "_")));
    }
  }, [locale]);

  const [kambiOffering, setKambiOffering] = React.useState("cauk");
  React.useEffect(() => {
    if (language) {
      setKambiOffering(getOffering(language));
    }
  }, [language]);

  const [promoCardsData, setPromoCardsData] = React.useState<PromoCardsType>();
  const [
    nextOffEventData,
    setNextOffEventData,
  ] = React.useState<KambiLandingEventResponse>();

  React.useEffect(() => {
    const fetchNextOffEvents = async (promoCards: any[]): Promise<any[]> => {
      // check for NextOff Cards
      if (
        promoCards.some(promoCard => promoCard.Type === PROMOCARDS_TYPE_NEXTOFF)
      ) {
        // fetch nextOff Data
        const landingEvents = await SportsHomeService.getNextOffEvent(
          kambiOffering,
          market,
          kambiLocale
        );

        const nextOffEvents = landingEvents?.data?.result?.filter(
          category => category.name === KAMBI_NEXTOFF_EVENT_NAME
        );

        if (
          nextOffEvents?.length &&
          nextOffEvents[0]?.events?.length > 0 &&
          isValidNextOffEvent(nextOffEvents[0]?.events[0]?.event, locale)
        ) {
          setNextOffEventData(nextOffEvents[0]?.events[0]?.event);
        } else {
          return promoCards.filter(
            promoCard => promoCard.Type !== PROMOCARDS_TYPE_NEXTOFF
          );
        }
      }

      return promoCards;
    };

    const isValidDeepLinkPromoCard = (
      deepLinkCard: any,
      activeOutcomeIds: number[]
    ): boolean => {
      return extractPromoCardOutcomeIds(deepLinkCard)?.every(outcome =>
        activeOutcomeIds.includes(outcome)
      );
    };

    const filterDeepLinkCards = async (promoCards: any[]): Promise<any[]> => {
      // check for DeepLink cards
      const deepLinkCards = promoCards.filter(
        promoCard => promoCard.Type === PROMOCARDS_TYPE_DEEP_LINK
      );

      if (deepLinkCards && deepLinkCards.length > 0) {
        // fetch deeplink data
        const deepLinkOutcomes = await SportsHomeService.getBetOfferForOutcomes(
          kambiOffering,
          market,
          kambiLocale,
          generateOutcomeIdsQueryString(deepLinkCards)
        );

        if (deepLinkOutcomes?.data?.betOffers) {
          const allOutcomes = deepLinkOutcomes?.data?.betOffers
            ?.map(x => x.outcomes)
            .reduce(flatten, []);

          const activeOutcomeIds = allOutcomes
            .filter(x => x.status === OUTCOME_STATUS_OPEN)
            .map(x => x.id);

          // remove cards with inactive outcomes
          if (activeOutcomeIds) {
            // confirm all outcomes in deeplink card are active
            return promoCards.filter(
              promoCard =>
                promoCard.Type !== PROMOCARDS_TYPE_DEEP_LINK ||
                (promoCard.Type === PROMOCARDS_TYPE_DEEP_LINK &&
                  isValidDeepLinkPromoCard(promoCard, activeOutcomeIds))
            );
          }
        }
      }

      return promoCards.filter(
        promoCard => promoCard.Type !== PROMOCARDS_TYPE_DEEP_LINK
      );
    };

    const fetchData = async () => {
      if (data) {
        const fetchedPromoCards =
          data?.promoCards?.data?.attributes?.PromoCards;

        if (fetchedPromoCards && Array.isArray(fetchedPromoCards)) {
          // filter promocards
          const validPromoCards = fetchedPromoCards.filter(promoCard => {
            return (
              promoCard.Enabled &&
              (DateTime.fromISO(promoCard.StartDate) <= DateTime.local() ||
                promoCard.StartDate === null) &&
              (DateTime.fromISO(promoCard.EndDate) >= DateTime.local() ||
                promoCard.EndDate === null)
            );
          });

          // check for next off events and fetch data
          const nextOffFilteredPromoCards = await fetchNextOffEvents(
            validPromoCards
          );

          // check for deeplink cards and their respective events
          const filteredPromoCards = await filterDeepLinkCards(
            nextOffFilteredPromoCards
          );

          setPromoCardsData(
            SportsHomeAdapters.convertToPromoCardsType(
              filteredPromoCards,
              locale,
              nextOffEventData,
              onClick
            )
          );
        }
      }
    };
    fetchData();
  }, [data, kambiOffering, kambiLocale, market, nextOffEventData, locale]);

  if (error || !data?.promoCards?.data?.attributes?.PromoCards.length) {
    return null;
  }

  return renderPromoCards(promoCardsData, tcDisclaimer);
};
