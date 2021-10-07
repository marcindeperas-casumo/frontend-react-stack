import React from "react";
import { ComponentBuilderRenderer } from "Components/ComponentBuilder/ComponentBuilderRenderer";
import { TPromotionVerticalCampaigns } from "Components/PromotionPage/PromotionPage.types";

type TProps = {
  promotionLists: TPromotionVerticalCampaigns;
};

export const ExplainerPage: React.FC<TProps> = ({ promotionLists }: TProps) => {
  return (
    <div>
      <div className="u-padding-top--3xlg@desktop u-margin-bottom--3xlg o-flex--vertical o-flex-align--center">
        <ComponentBuilderRenderer
          componentDefinitions={promotionLists}
          hideShowMoreLink
        />
      </div>
    </div>
  );
};
