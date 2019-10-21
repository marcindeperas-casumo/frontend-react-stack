import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import ImageLazy from "Components/Image/ImageLazy";

const PromotionGalleryCardHeader = ({ badge, dates }) => {
  return (
    <Flex
      className="u-padding-x@mobile
        u-padding-x@phablet
        u-padding-x--md
        u-padding-bottom--sm"
      justify="space-between"
      align="end"
    >
      <Flex.Item>
        <Text
          tag="strong"
          className="t-color-chrome-dark-1 u-text-transform-uppercase"
          size="2xs"
        >
          {dates}
        </Text>
      </Flex.Item>
      <Flex.Item className="o-flex__item--no-shrink">
        <ImageLazy
          className="u-display--block"
          width="30px"
          height="30px"
          src={badge}
          imgixOpts={{ w: 30, h: 30 }}
          dpr={3}
        />
      </Flex.Item>
    </Flex>
  );
};

export default PromotionGalleryCardHeader;
