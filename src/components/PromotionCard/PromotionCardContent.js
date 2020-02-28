import React from "react";
import Text from "@casumo/cmp-text";
import DangerousHtml from "Components/DangerousHtml";

export const PromotionCardContent = ({ title }) => {
  return (
    <Text
      tag="div"
      className="t-color-chrome-dark-3 u-padding-x--lg u-padding-top u-padding-bottom--md u-font-weight-bold"
      size="lg"
    >
      <DangerousHtml html={title} />
    </Text>
  );
};
