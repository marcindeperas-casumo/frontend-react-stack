// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import ImageLazy from "Components/Image/ImageLazy";
import DangerousHtml from "Components/DangerousHtml";

type Props = {
  /** The date range the promotion will run for. */
  date: String,
  /** The title of the promotion. */
  title: String,
  /** The src of the image to show on the right. */
  imageSrc: String,
};

export class PromotionCardTeaser extends PureComponent<Props> {
  render() {
    const { date, title, imageSrc } = this.props;
    return (
      <Flex
        align="center"
        className="t-background-white t-border-r--16 u-padding--lg u-line-height--1"
      >
        <Flex.Block>
          <Text size="xs" className="t-color-red u-margin-bottom">
            {date}
          </Text>
          <Text className="u-font-weight-bold u-margin-bottom--none" size="xlg">
            <DangerousHtml html={title} />
          </Text>
        </Flex.Block>
        <Flex.Item>
          <ImageLazy src={imageSrc} />
        </Flex.Item>
      </Flex>
    );
  }
}

export default PromotionCardTeaser;
