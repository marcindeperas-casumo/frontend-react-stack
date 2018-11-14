import React from "react";
import CMSField from "Components/CMSField";
import Text from "@casumo/cmp-text";

const PromotionCardContent = ({ slug }) => {
  return (
    <Text
      tag="div"
      className="c-promotion-card__content t-color-grey-dark-3 u-padding-horiz--lg u-padding-top u-padding-bottom--md u-font-weight-bold"
      size="lg"
    >
      <CMSField slug={slug} field="title" />
    </Text>
  );
};

export default PromotionCardContent;
