// @flow
import React, { PureComponent } from "react";
import PromotionCardContainer from "Components/PromotionCard";
import Scrollable from "@casumo/cmp-scrollable";

export type Props = {
  promotions: Object,
};

export class PromotionCards extends PureComponent<Props> {
  render() {
    return (
      <Scrollable gap="none" padding="lg">
        <PromotionCardContainer slug="first-promotion" />
        <PromotionCardContainer slug="second-promotion" />
        <PromotionCardContainer slug="third-promotion" />
        <PromotionCardContainer slug="fourth-promotion" />
        <PromotionCardContainer slug="fifth-promotion" />
      </Scrollable>
    );
  }
}

export default PromotionCards;
