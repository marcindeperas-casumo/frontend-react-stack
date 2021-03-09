import Text from "@casumo/cmp-text";
import React from "react";
import DangerousHtml from "Components/DangerousHtml";

export const PromotionCardContent = ({ title }) => {
  return (
    <Text
      tag="div"
      className="t-color-grey-90 u-padding-x--lg u-padding-top u-padding-bottom--md u-font-weight-bold"
      size="lg"
    >
      <DangerousHtml html={title} />
    </Text>
  );
};
