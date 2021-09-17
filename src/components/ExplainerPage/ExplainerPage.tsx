import React from "react";
import { ComponentBuilderRenderer } from "Components/ComponentBuilder/ComponentBuilderRenderer";
import { TPromotionVerticalCampaigns } from "Components/PromotionPage/PromotionPage.types";

type TProps = {
  promotionLists: TPromotionVerticalCampaigns;
};
// todo: refactor page to be a 'built-in' page in cms (content builder) composed with promotions
export const ExplainerPage: React.FC<TProps> = ({ promotionLists }: TProps) => {
  return (
    <div>
      <div className="u-padding-top--3xlg@desktop u-margin-bottom--3xlg">
        <ComponentBuilderRenderer
          componentDefinitions={promotionLists}
          hideShowMoreLink
        />
      </div>
    </div>
  );
};
