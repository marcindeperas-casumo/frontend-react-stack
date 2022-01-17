import { useQuery } from "@apollo/client";
import { SportsPromo } from "@casumo/sports-promo";
import * as React from "react";
import { SPORTS_PROMO_CARDS_QUERY } from "Features/sports/components/SportsHome/SportsHomeQueries";
import { PromoCardsType } from "./types";
import SportsHomeAdapters from "./SportsHome.adapters";

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
    locale: "en-GB",
  };
  const { error, data } = useQuery(SPORTS_PROMO_CARDS_QUERY, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const [promoCardsData, setPromoCardsData] = React.useState<PromoCardsType>();

  React.useEffect(() => {
    const fetchData = () => {
      if (data) {
        setPromoCardsData(
          SportsHomeAdapters.convertToPromoCardsType(
            data?.promoCards?.data?.attributes?.PromoCards
          )
        );
      }
    };
    fetchData();
  }, [data]);

  if (error || !data?.promoCards?.data?.attributes?.PromoCards.length) {
    return null;
  }

  return renderPromoCards(promoCardsData);
};
