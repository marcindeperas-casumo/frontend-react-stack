// @flow
import React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import { PromotionCardList } from "./PromotionCardList";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './PromotionCardListContainer.g... Remove this comment to see the full error message
import { PromotionsListQuery } from "./PromotionCardListContainer.graphql";
import { PromotionCardListSkeleton } from "./PromotionCardListSkeleton";
type Props = {
  slug: string,
};

const PromotionCardListContainer = React.memo<Props>(({ slug }: Props) => {
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

  if (data && data.promotionsList && data.promotionsList.promotions.length) {
    return (
      <PromotionCardList
        seeMoreText={t.more_link}
        id={data.promotionsList.id}
        name={data.promotionsList.name}
        promotions={data.promotionsList.promotions}
      />
    );
  }

  return null;
});

export default PromotionCardListContainer;
