// @flow
import React, { PureComponent } from "react";
import PromotionCardContainer from "Components/PromotionCard";
import Scrollable from "@casumo/cmp-scrollable";

export type Props = {
  promotionsSlugs: Array<string>,
  isFetched: boolean,
  startFetch: () => void,
};

export class PromotionCards extends PureComponent<Props> {
  componentDidMount() {
    const { isFetched, startFetch } = this.props;

    if (!isFetched) {
      startFetch();
    }
  }

  render() {
    // const { promotionsSlugs } = this.props;
    const promotionsSlugs = ["dai", "cazzo"]; // SWITCH THIS ONE WITH THE ABOVE ☝🏻

    return promotionsSlugs && promotionsSlugs.length > 0 ? (
      <Scrollable gap="none" padding="lg">
        {promotionsSlugs.map(slug => (
          <PromotionCardContainer slug={slug} key={slug} />
        ))}
      </Scrollable>
    ) : null;
  }
}

export default PromotionCards;
