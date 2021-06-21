import { useQuery } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import { PromotionCardList } from "./PromotionCardList";
import { PromotionsListQuery } from "./PromotionCardListContainer.graphql";
import { PromotionCardListSkeleton } from "./PromotionCardListSkeleton";

type Props = {
  slug: string;
  name?: string;
  showSeeMoreLink?: boolean;
  skipGql?: boolean;
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

    const promoListData = useTranslations<{
      list_title: string;
      promotions: [object];
    }>(slug);

    if (loading || !t) {
      return <PromotionCardListSkeleton />;
    }

    if (
      promoListData?.promotions.length ||
      data?.promotionsList?.promotions?.length
    ) {
      const promotionsListToUse = !data?.promotionsList?.promotions.length && promoListData.promotions ? promoListData.promotions : data.promotionsList.promotions
      return (
        <PromotionCardList
          seeMoreText={showSeeMoreLink && t.more_link}
          id={promoListData?.list_title || data?.promotionsList?.id}
          name={name || promoListData.list_title || data.promotionsList.name}
          promotions={promotionsListToUse}
        />
      );
    }

    return null;
  }
);

export default PromotionCardListContainer;
