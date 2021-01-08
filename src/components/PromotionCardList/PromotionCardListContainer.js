// @flow
import React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
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

  const { t, loading: cmsLoading } = useTranslationsGql({
    seeMoreText: "root:built-pages.top-lists-translations:fields.more_link",
  });

  if (loading || cmsLoading) {
    return <PromotionCardListSkeleton />;
  }

  if (data && data.promotionsList && data.promotionsList.promotions.length) {
    return (
      <PromotionCardList
        seeMoreText={t.seeMoreText}
        id={data.promotionsList.id}
        name={data.promotionsList.name}
        promotions={data.promotionsList.promotions}
      />
    );
  }

  return null;
};

export default PromotionCardListContainer;
