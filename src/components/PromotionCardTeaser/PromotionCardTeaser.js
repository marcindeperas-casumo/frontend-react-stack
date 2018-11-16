// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import ImageLazy from "Components/Image/ImageLazy";
import DangerousHtml from "Components/DangerousHtml";
import "./PromotionCardTeaser.scss";

export type Props = {
  slug: String,
  badge: String,
  dates: String,
  title: String,
};

export class PromotionCardTeaser extends PureComponent<Props> {
  render() {
    const { slug, badge, dates, title } = this.props;

    return (
      <a href={slug} className="c-promotion-card-teaser">
        <Flex className="t-background-white t-border-r--16 u-padding--lg u-line-height--1">
          <Flex.Block>
            <Text
              size="xs"
              className="t-color-red u-margin-bottom u-text-transform-uppercase"
            >
              {dates}
            </Text>
            <Text
              className="u-font-weight-bold u-margin-bottom--none t-color-grey-dark-3"
              size="xlg"
            >
              {title}
            </Text>
          </Flex.Block>
          <Flex.Item>
            <ImageLazy src={badge} width="80" height="80" />
          </Flex.Item>
        </Flex>
      </a>
    );
  }
}

export default PromotionCardTeaser;
