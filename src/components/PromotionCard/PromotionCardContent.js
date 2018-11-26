import React from "react";
import Text from "@casumo/cmp-text";

const PromotionCardContent = ({ title }) => {
  return (
    <Text
      tag="div"
      className="c-promotion-card__content t-color-grey-dark-3 u-padding-horiz--lg u-padding-top u-padding-bottom--md u-font-weight-bold"
      size="lg"
    >
      {title}
    </Text>
  );
};

export default PromotionCardContent;
