// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import ImageLazy from "Components/Image/ImageLazy";

type Props = {
  /** The boolean that states if the promotion page has been fetched */
  isFetched: boolean,
  /** The function that fetches the promotion page if not fetched yet */
  startFetch: () => void,
  /** The link to the right promotion detailed view */
  link: string,
  /** The badge image of the promotion */
  badge: string,
  /** The date range the promotion will run for. */
  dates: string,
  /** The title of the promotion. */
  title: string,
};

class PromotionCardTeaser extends PureComponent<Props> {
  componentDidMount() {
    const { isFetched, startFetch } = this.props;

    if (!isFetched) {
      startFetch();
    }
  }

  render() {
    const { badge, dates, title, link } = this.props;

    return (
      <a href={link}>
        <Flex
          spacing="md"
          className="t-background-white t-border-r--md u-padding--lg u-line-height--1"
        >
          <Flex.Block>
            <Text
              size="2xs"
              className="t-color-chrome-dark-1 u-margin-bottom u-text-transform-uppercase u-font-weight-bold"
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
          {badge && (
            <Flex.Item className="o-flex__item--no-shrink">
              <ImageLazy src={badge} width="80" height="80" />
            </Flex.Item>
          )}
        </Flex>
      </a>
    );
  }
}

export default PromotionCardTeaser;
