import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import ImageLazy from "Components/Image/ImageLazy";
import Text from "@casumo/cmp-text";
export class PromotionCardTeaser extends PureComponent {
  render() {
    return (
      <Flex
        align="center"
        className="t-background-white t-border-r--16 u-padding--lg"
        style={{ lineHeight: 1 }}
      >
        <Flex.Block>
          <Text size="xs" className="t-color-red u-margin-bottom">
            30 Nov 2018 - 6 Jan 2019
          </Text>
          <Text className="u-font-weight-bold u-margin-bottom--none" size="xlg">
            Boosted
            <br /> Reel
            <br /> Races
          </Text>
        </Flex.Block>
        <Flex.Item>
          <ImageLazy src="https://cms.casumo.com/wp-content/uploads/2018/11/promotions-bonus-cards.svg" />
        </Flex.Item>
      </Flex>
    );
  }
}

export default PromotionCardTeaser;
