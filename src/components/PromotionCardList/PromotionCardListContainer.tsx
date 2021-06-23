import { useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import type {
  TFlattenedPromotion,
  TPromotionTranslations,
  TPromotion,
} from "../../models/promotions/promotions.types";
import { PromotionCardList } from "./PromotionCardList";
import { PromotionsListQuery } from "./PromotionCardListContainer.graphql";
import { PromotionCardListSkeleton } from "./PromotionCardListSkeleton";

type Props = {
  slug: string;
  name?: string;
  showSeeMoreLink?: boolean;
  skipGql?: boolean;
};

const flattenPromotions = (promotions: TPromotion[]): TFlattenedPromotion[] => {
  return promotions.map(promo => ({ slug: promo.slug, ...promo.fields }));
};

const PromotionCardListContainer = React.memo<Props>(
  ({ slug, name, showSeeMoreLink, skipGql }: Props) => {
    const { data, loading } = useQuery<
      A.PromotionsListQuery,
      A.PromotionsListQueryVariables
    >(PromotionsListQuery, {
      variables: {
        slug,
      },
      skip: skipGql === true,
    });

    const t = useTranslations<{ more_link: string }>(
      "built-pages.top-lists-translations"
    );

    const promotionsList = useTranslations<TPromotionTranslations>(slug);

    if (loading || !promotionsList || !t) {
      return <PromotionCardListSkeleton />;
    }

    const flattenedPromotionsList = flattenPromotions(
      promotionsList.promotions
    );

    if (
      promotionsList?.promotions.length ||
      data?.promotionsList?.promotions?.length
    ) {
      const promotionsListToUse =
        !data?.promotionsList?.promotions.length && promotionsList.promotions
          ? flattenedPromotionsList
          : data.promotionsList.promotions;
      return (
        <PromotionCardList
          seeMoreText={showSeeMoreLink && t.more_link}
          name={name || promotionsList.list_title || data.promotionsList.name}
          promotions={promotionsListToUse}
        />
      );
    }

    return null;
  }
);

export default PromotionCardListContainer;
