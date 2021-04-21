import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { MoreIcon } from "@casumo/cmp-icons";
import React, { PureComponent } from "react";

type Props = {
  /** The link to the right promotion detailed view */
  link: string;
  /** The date range the promotion will run for. */
  dates: string;
  /** The title of the promotion. */
  title: string;
};

export class PromotionTeaserRow extends PureComponent<Props> {
  render() {
    const { dates, title, link } = this.props;

    return (
      <a href={link}>
        <Flex
          spacing="md"
          className="u-padding-y--lg u-line-height--1 t-border-bottom text-grey-0 t-border-current"
        >
          <Flex.Block>
            <Text
              data-test="promotion-dates"
              size="2xs"
              className="text-purple-60 u-margin-bottom u-text-transform-uppercase u-font-weight-bold"
            >
              {dates}
            </Text>
            <Text
              data-test="promotion-title"
              className="u-font-weight-bold u-margin-bottom--none text-grey-70"
            >
              {title}
            </Text>
          </Flex.Block>
          <MoreIcon className="bg-white text-grey-5 t-border-r--circle u-padding-y--md" />
        </Flex>
      </a>
    );
  }
}
