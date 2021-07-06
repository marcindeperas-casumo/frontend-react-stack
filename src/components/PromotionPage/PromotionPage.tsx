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
        <PromotionCardListContainer key={promo.origin} slug={promo.slug} />
      ))}
    </div>
  );
};
