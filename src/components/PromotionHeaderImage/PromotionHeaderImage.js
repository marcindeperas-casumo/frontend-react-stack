// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import ImageLazy from "Components/Image/ImageLazy";
import "Components/PromotionHeaderImage/PromotionHeaderImage.scss";

type Props = {
  /** Promotion badge image url */
  badge: string,
  /** Promotion image url */
  image: string,
};

export class PromotionHeaderImage extends PureComponent<Props> {
  renderBadge() {
    const { badge } = this.props;
    const Component = badge.match(/\.svg$/) ? "img" : "ImageLazy";
    return (
      <Flex
        className="o-ratio__content u-object-fit-cover"
        align="center"
        justify="center"
      >
        <Component className="c-promotion-header-badge" src={badge} />
      </Flex>
    );
  }
  render() {
    const { image, badge = "" } = this.props;
    return (
      <div className="o-ratio o-ratio--promotion-header-image u-margin-bottom--xlg">
        <ImageLazy
          className="o-ratio__content u-object-fit-cover"
          src={image}
          imgixOpts={{ w: 546 }}
          dpr={3}
        />
        {badge && this.renderBadge()}
      </div>
    );
  }
}

export default PromotionHeaderImage;
