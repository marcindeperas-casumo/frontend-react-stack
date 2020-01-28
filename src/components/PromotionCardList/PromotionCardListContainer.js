// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import PromotionCardList from "./PromotionCardList";
import { PromotionsListQuery } from "./PromotionCardListContainer.graphql";
type Props = {
  slug: string,
};

const PromotionCardListContainer = ({ slug }: Props) => {
  const { data, loading } = useQuery<
    A.PromotionsListQuery,
    A.PromotionsListQueryVariables
  >(PromotionsListQuery, {
    variables: {
      slug,
    },
  });
  if (loading) {
    // __FIX__ - use a skeleton here. 💀
    return null;
  }

  if (data && data.promotionsList) {
    return (
      <PromotionCardList
        seeMore="..."
        id={data.promotionsList.id}
        name={data.promotionsList.name}
        promotions={data.promotionsList.promotions}
      />
    );
  }
};

export default PromotionCardListContainer;
