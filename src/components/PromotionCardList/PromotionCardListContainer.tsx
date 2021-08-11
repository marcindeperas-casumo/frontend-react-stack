import React from "react";
import * as R from "ramda";
import { useTranslations } from "Utils/hooks";
import type {
  TPromotion,
  TFlattenedPromotion,
  TPromotionListContents,
} from "../../models/promotions/promotions.types";
import { PromotionCardList } from "./PromotionCardList";
import { PromotionCardListSkeleton } from "./PromotionCardListSkeleton";

type Props = {
  slug: string;
  hideShowMoreLink?: boolean;
};

const flattenPromotions = (promotions: TPromotion[]): TFlattenedPromotion[] => {
  return promotions.map(promo => ({ slug: promo.slug, ...promo.fields }));
};

const PromotionCardListContainer = React.memo<Props>(
  ({ slug, hideShowMoreLink }: Props) => {
    const t = useTranslations<{ more_link: string }>(
      "built-pages.top-lists-translations"
    );
    const promotionsList = useTranslations<TPromotionListContents>(slug);

    if (slug === "null") {
      return null;
    }

    if (!promotionsList || !t) {
      return <PromotionCardListSkeleton />;
    }

    if (R.isEmpty(promotionsList.promotions)) {
      return null;
    }

    const flattenedPromotionsList = flattenPromotions(
      promotionsList.promotions
    );

    if (promotionsList?.promotions.length) {
      return (
        <PromotionCardList
          seeMoreText={!hideShowMoreLink && t?.more_link}
          name={promotionsList?.list_title}
          promotions={flattenedPromotionsList}
        />
      );
    }

    return null;
  }
);

export default PromotionCardListContainer;
