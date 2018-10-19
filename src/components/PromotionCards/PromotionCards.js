import React, { PureComponent } from "react";
import PromotionCardContainer from "Components/PromotionCard";
import Scrollable from "@casumo/cmp-scrollable";

export class PromotionCards extends PureComponent {
  render() {
    return (
      <Scrollable gap="none" padding="lg">
        <PromotionCardContainer slug="sto cazzo page" />
        <PromotionCardContainer slug="sto cazzo page" />
        <PromotionCardContainer slug="sto cazzo page" />
        <PromotionCardContainer slug="sto cazzo page" />
        <PromotionCardContainer slug="sto cazzo page" />
      </Scrollable>
    );
  }
}

export default PromotionCards;
