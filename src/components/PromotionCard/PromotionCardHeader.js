import React from "react";
import CMSField from "Components/CMSField";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import ImageLazy from "Components/Image/ImageLazy";

const PromotionCardHeader = ({ slug, promotionPage }) => {
  const imgSrc = promotionPage.fields.campaign_badge;
  return (
    <Flex className="u-padding-horiz--lg" justify="space-between" align="end">
      <Text tag="strong" className="t-color-red" size="xs">
        <CMSField slug={slug} field="dates" />
      </Text>
      <ImageLazy
        className="u-display--block"
        width="40px"
        height="40px"
        src={imgSrc}
        imgixOpts={{ w: 40, h: 40 }}
        dpr={3}
      />
    </Flex>
  );
};

export default PromotionCardHeader;
