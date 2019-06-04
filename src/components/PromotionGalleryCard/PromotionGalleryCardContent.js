import React from "react";
import Text from "@casumo/cmp-text";

const PromotionGalleryCardContent = ({ title }) => {
  return (
    <Text
      tag="div"
      className="c-promotion-gallery-card__content
        t-color-grey-dark-3
        u-padding-x@mobile
        u-padding-x@phablet
        u-padding-x--md
        u-padding-bottom
        u-font-weight-bold"
      size="lg"
    >
      {title}
    </Text>
  );
};

export default PromotionGalleryCardContent;
