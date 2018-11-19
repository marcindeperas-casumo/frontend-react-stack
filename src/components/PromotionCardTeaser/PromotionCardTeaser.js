// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import ImageLazy from "Components/Image/ImageLazy";
import "./PromotionCardTeaser.scss";

type Props = {
  /** The boolean that states if the promotion page has been fetched */
  isFetched: boolean,
  /** The function that fecthes the promotion page if not fecthed yet */
  startFetch: () => void,
  /** The slug of the page in the CMS which has the promotion info */
  slug: string,
  /** The badge image of the promotion */
  badge: string,
  /** The date range the promotion will run for. */
  dates: string,
  /** The title of the promotion. */
  title: string,
};

export class PromotionCardTeaser extends PureComponent<Props> {
  componentDidMount() {
    const { isFetched, startFetch } = this.props;

    if (!isFetched) {
      startFetch();
    }
  }

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
          <Flex.Item className="o-flex__item-fixed-size">
            <ImageLazy src={badge} width="80" height="80" />
          </Flex.Item>
        </Flex>
      </a>
    );
  }
}

export default PromotionCardTeaser;
