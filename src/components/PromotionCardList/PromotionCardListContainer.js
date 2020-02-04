// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { PromotionCardList } from "./PromotionCardList";
import { PromotionsListQuery } from "./PromotionCardListContainer.graphql";
import { PromotionCardListSkeleton } from "./PromotionCardListSkeleton";
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
    return <PromotionCardListSkeleton />;
  }

  if (data && data.promotionsList && data.promotionsList.promotions.length) {
    return (
      <PromotionCardList
        // __FIX__ - should use the translated page like all the rest of em.
        seeMore="..."
        id={data.promotionsList.id}
        name={data.promotionsList.name}
        promotions={data.promotionsList.promotions}
      />
    );
  }

  return null;
};

export default PromotionCardListContainer;
