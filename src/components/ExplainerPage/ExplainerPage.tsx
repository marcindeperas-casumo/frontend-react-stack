import React from "react";
import Flex from "@casumo/cmp-flex";
import { ComponentBuilderRenderer } from "Components/ComponentBuilder/ComponentBuilderRenderer";
import { TPromotionVerticalCampaigns } from "Components/PromotionPage/PromotionPage.types";
import { isDesktop } from "Components/ResponsiveLayout";

type TProps = {
  promotionLists: TPromotionVerticalCampaigns;
};

export const ExplainerPage: React.FC<TProps> = ({ promotionLists }: TProps) => {
  return (
    <div>
      <Flex
        direction={isDesktop() ? "horizontal" : "vertical"}
        justify="center"
        align="center"
        className="u-padding-top--lg u-margin-bottom--3xlg"
      >
        <ComponentBuilderRenderer
          componentDefinitions={promotionLists}
          hideShowMoreLink
        />
      </Flex>
    </div>
  );
};
