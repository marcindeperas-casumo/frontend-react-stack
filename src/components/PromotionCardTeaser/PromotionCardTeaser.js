// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import ImageLazy from "Components/Image/ImageLazy";
import DangerousHtml from "Components/DangerousHtml";
import "./PromotionCardTeaser.scss";

type Props = {
  /** The date range the promotion will run for. */
  date: String,
  /** The title of the promotion. */
  title: String,
  /** The src of the image to show on the right. */
  imageSrc: String,
  /** The link where the card is leading to */
  link: String,
};

export class PromotionCardTeaser extends PureComponent<Props> {
  render() {
    const { date, title, imageSrc, link } = this.props;
    return (
      <a href={link} className="c-promotion-card-teaser t-color-grey-3">
        <Flex
          align="center"
          className="t-background-white t-border-r--16 u-padding--lg u-line-height--1"
        >
          <Flex.Block>
            <Text
              size="xs"
              className="t-color-red u-margin-bottom u-text-transform-uppercase"
            >
              {date}
            </Text>
            <Text
              className="u-font-weight-bold u-margin-bottom--none"
              size="xlg"
            >
              <DangerousHtml html={title} />
            </Text>
          </Flex.Block>
          <Flex.Item>
            <ImageLazy src={imageSrc} />
          </Flex.Item>
        </Flex>
      </a>
    );
  }
}

export default PromotionCardTeaser;
