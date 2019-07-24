import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import ImageLazy from "Components/Image/ImageLazy";

const PromotionCardHeader = ({ badge, dates }) => {
  return (
    <Flex
      className="u-padding-x--lg u-line-height--1"
      justify="space-between"
      align="end"
    >
      <Flex.Item>
        <Text
          tag="strong"
          className="t-color-red u-text-transform-uppercase"
          size="2xs"
        >
          {dates}
        </Text>
      </Flex.Item>
      <Flex.Item className="o-flex__item--no-shrink">
        {badge && (
          <ImageLazy
            className="u-display--block"
            width="40px"
            height="40px"
            src={badge}
            imgixOpts={{ w: 40, h: 40 }}
            dpr={3}
          />
        )}
      </Flex.Item>
    </Flex>
  );
};

export default PromotionCardHeader;
