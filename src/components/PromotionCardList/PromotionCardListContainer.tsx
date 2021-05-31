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
};

const PromotionCardListContainer = React.memo<Props>(
  ({ slug, name, showSeeMoreLink }: Props) => {
    const { data, loading } = useQuery<
      A.PromotionsListQuery,
      A.PromotionsListQueryVariables
    >(PromotionsListQuery, {
      variables: {
        slug,
      },
    });

    const t = useTranslations<{ more_link: string }>(
      "built-pages.top-lists-translations"
    );

    if (loading || !t) {
      return <PromotionCardListSkeleton />;
    }

    if (data?.promotionsList?.promotions?.length) {
      return (
        <PromotionCardList
          seeMoreText={showSeeMoreLink && t.more_link}
          id={data.promotionsList.id}
          name={name || data.promotionsList.name}
          promotions={data.promotionsList.promotions}
        />
      );
    }

    return null;
  }
);

export default PromotionCardListContainer;
