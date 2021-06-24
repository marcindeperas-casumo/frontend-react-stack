import React from "react";
// import ComponentBuilder from "Components/ComponentBuilder";
import PromotionCardListContainer from "Components/PromotionCardList/PromotionCardListContainer";
import { TPromotionVerticalCampaigns } from "./PromotionPage.types";

type TProps = {
  promotionLists: TPromotionVerticalCampaigns;
};
// todo: refactor page to be a 'built-in' page in cms (content builder) composed with promotions
export const PromotionPage: React.FC<TProps> = ({ promotionLists }: TProps) => {
  return (
    <div>
      {promotionLists.map(promo => (
        <PromotionCardListContainer
          key={promo.origin}
          slug={promo.slug}
          skipGql
        />
        // <ComponentBuilder
        //   // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; slug: string; }' is not assi... Remove this comment to see the full error message
        //   path="top"
        //   key={promo.origin}
        //   slug={promo.slug}
        // />
      ))}
    </div>
  );
};
