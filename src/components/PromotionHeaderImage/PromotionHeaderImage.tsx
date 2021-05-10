import Flex from "@casumo/cmp-flex";
import React, { PureComponent } from "react";
import ImageLazy from "Components/Image/ImageLazy";
import { promotionsHeaderImageSet } from "./utils";

import "Components/PromotionHeaderImage/PromotionHeaderImage.scss";

type Props = {
  /** Promotion badge image url */
  badge: string;
  /** Promotion image url */
  image: string;
};

type BadgeProps = {
  /** Promotion badge image url */
  badge: string;
};

export const PromotionHeaderBadge = ({ badge }: BadgeProps) => {
  const ImageComponent = badge.match(/\.svg$/) ? "img" : "ImageLazy";
  return (
    <Flex
      className="o-ratio__content u-object-fit-cover"
      align="center"
      justify="center"
    >
      {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'ImageLazy' does not exist on type 'JSX.I... Remove this comment to see the full error message */}
      <ImageComponent className="c-promotion-header-badge" src={badge} />
    </Flex>
  );
};

class PromotionHeaderImage extends PureComponent<Props> {
  render() {
    const { image, badge = "" } = this.props;
    const images = promotionsHeaderImageSet(image);

    return (
      <div className="o-ratio o-ratio--promotion-header-image u-margin-bottom--xlg u-overflow--hidden">
        <ImageLazy
          className="o-ratio__content u-object-fit-cover"
          images={images}
        />
        {badge && <PromotionHeaderBadge badge={badge} />}
      </div>
    );
  }
}

export default PromotionHeaderImage;
