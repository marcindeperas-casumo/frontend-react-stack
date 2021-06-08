import Flex from "@casumo/cmp-flex";
import React from "react";
import ImageLazy from "Components/Image/ImageLazy";
import { promotionsHeaderImageSet } from "./utils";

import "Components/PromotionHeaderImage/PromotionHeaderImage.scss";

type TProps = {
  /** Promotion badge image url */
  badge: string;
  /** Promotion image url */
  image: string;
};

type TBadgeProps = {
  /** Promotion badge image url */
  badge: string;
};

export const PromotionHeaderBadge: React.FC<TBadgeProps> = ({
  badge,
}: TBadgeProps) => {
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

const PromotionHeaderImage: React.FC<TProps> = ({
  image,
  badge = "",
}: TProps) => {
  const images = promotionsHeaderImageSet(image);

  //o-ratio o-ratio--promotion-header-image u-margin-bottom--xlg u-overflow--hidden
  return (
    <div className="col-span-1">
      <ImageLazy images={images} />
      {badge && <PromotionHeaderBadge badge={badge} />}
    </div>
  );
};

export default PromotionHeaderImage;
