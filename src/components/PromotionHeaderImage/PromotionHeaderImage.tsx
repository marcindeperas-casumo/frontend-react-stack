import Flex from "@casumo/cmp-flex";
import React from "react";
import cx from "classnames";
import ImageLazy from "Components/Image/ImageLazy";
import { promotionsHeaderImageSet } from "./utils";

import "Components/PromotionHeaderImage/PromotionHeaderImage.scss";

type TProps = {
  /** Promotion badge image url */
  badge: string;
  /** Promotion image url */
  image: string;
  /** The Column width this item should span in the grid layout, currently supporting 2 columns  */
  gridColumnWidth?: string;
};

type TBadgeProps = {
  /** Promotion badge image url */
  badge: string;
};

const ROOT_CLASSNAME = "c-promotion-header-image";

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
  gridColumnWidth,
}: TProps) => {
  const images = promotionsHeaderImageSet(image);

  return (
    <div
      className={cx(
        ROOT_CLASSNAME,
        "px-lg",
        gridColumnWidth && `col-span-${gridColumnWidth}`
      )}
    >
      <ImageLazy className="overflow-hidden rounded-3xl" images={images} />
      {/** TODO: check if we can remove badge from impl. not in designs */}
      {/* {badge && <PromotionHeaderBadge badge={badge} />} */}
    </div>
  );
};

export default PromotionHeaderImage;
