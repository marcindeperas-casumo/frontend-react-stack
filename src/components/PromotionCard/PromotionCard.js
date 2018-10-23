// @flow
import React, { PureComponent } from "react";
// import CMSField from "Components/CMSField";
import Text from "@casumo/cmp-text";
import Card from "@casumo/cmp-card";
import PromotionCardSkeleton from "./PromotionCardSkeleton";
import ImageLazy from "Components/Image/ImageLazy";
import "./PromotionCard.scss";

const PROMOTIONS_URL = "/en/promotions";

export type Props = {
  isFetched: boolean,
  slug: string,
};

export default class PromotionCard extends PureComponent<Props> {
  renderHeader = () => {
    // const { slug } = this.props;

    return (
      <Text tag="strong" className="t-color-red" size="xs">
        30 NOV - 1 JAN
        {/* <CMSField slug="" field="" /> */}
      </Text>
    );
  };

  renderContent = () => {
    // const { slug } = this.props;

    return (
      <Text tag="strong" className="t-color-grey-dark-3" size="lg">
        Slots <br /> Mystery <br /> Prizes
        {/* <CMSField slug="" field="" /> */}
      </Text>
    );
  };

  renderImage = () => {
    return (
      <ImageLazy
        className="u-display--block c-promotion-card__img"
        src="https://cms.casumo.com/wp-content/uploads/2018/10/testxmaspromo.png"
        imgixOpts={{ w: 280 }}
        dpr={3}
      />
    );
  };

  renderCard = () => {
    const { slug } = this.props;
    const promotionCardURL = `${PROMOTIONS_URL}/${slug}`;

    return (
      <a
        href={promotionCardURL}
        className="c-promotion-card__link o-flex__item-fixed-size"
        onMouseDown={e => e.preventDefault()}
      >
        <Card
          className="t-border-r--8 u-padding t-background-grey-light-2 "
          header={this.renderHeader}
          content={this.renderContent}
          footer={this.renderImage}
        />
      </a>
    );
  };

  render() {
    const { isFetched } = this.props;
    // switch from true to isFetched 👇🏻
    return true ? this.renderCard() : <PromotionCardSkeleton />;
  }
}
