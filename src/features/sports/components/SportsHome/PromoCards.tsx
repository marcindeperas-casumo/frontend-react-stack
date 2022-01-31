import { useQuery } from "@apollo/client";
import { SportsPromo } from "@casumo/sports-promo";
import * as React from "react";
import { navigate } from "@reach/router";
import { DateTime } from "luxon";
import { SPORTS_PROMO_CARDS_QUERY } from "Features/sports/components/SportsHome/SportsHomeQueries";
import { getKambiWidgetAPI } from "Features/sports/kambi";
import { PromoCardsType } from "./types";
import SportsHomeAdapters from "./SportsHome.adapters";
import {
  PROMOCARDS_TYPE_DEEP_LINK,
  PROMOCARDS_TYPE_DIRECT_LINK,
  PROMOCARDS_TYPE_LINK,
  PROMOCARDS_TYPE_NEXTOFF,
} from "./SportsHome.constants";

const onClick = async (url: string, type: string) => {
  if (
    [
      PROMOCARDS_TYPE_DEEP_LINK,
      PROMOCARDS_TYPE_DIRECT_LINK,
      PROMOCARDS_TYPE_NEXTOFF,
    ].includes(type)
  ) {
    const wapi = await getKambiWidgetAPI();
    wapi.navigateClient(url);
  }

  if (type === PROMOCARDS_TYPE_LINK) {
    navigate(url);
  }
};

const renderPromoCards = (data: PromoCardsType) => {
  if (!data) {
    return null;
  }

  return (
    <div>
      <SportsPromo promoCards={data?.promoCards} />
    </div>
  );
};

export const PromoCards = ({ locale }: { locale: string }) => {
  const variables = {
    locale: locale,
  };
  const { error, data } = useQuery(SPORTS_PROMO_CARDS_QUERY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const [promoCardsData, setPromoCardsData] = React.useState<PromoCardsType>();

  React.useEffect(() => {
    const fetchData = () => {
      if (data) {
        const fetchedPromoCards =
          data?.promoCards?.data?.attributes?.PromoCards;

        if (fetchedPromoCards && Array.isArray(fetchedPromoCards)) {
          // filter promocards
          const filteredPromoCards = fetchedPromoCards.filter(promoCard => {
            return (
              promoCard.Enabled &&
              (DateTime.fromISO(promoCard.StartDate) <= DateTime.local() ||
                promoCard.StartDate === null) &&
              (DateTime.fromISO(promoCard.EndDate) >= DateTime.local() ||
                promoCard.EndDate === null)
            );
          });

          setPromoCardsData(
            SportsHomeAdapters.convertToPromoCardsType(
              filteredPromoCards,
              onClick
            )
          );
        }
      }
    };
    fetchData();
  }, [data]);

  if (error || !data?.promoCards?.data?.attributes?.PromoCards.length) {
    return null;
  }

  return renderPromoCards(promoCardsData);
};
