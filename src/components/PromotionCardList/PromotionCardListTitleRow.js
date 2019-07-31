// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import ScrollableListTitle from "Components/ScrollableListTitle";

type Props = {
  /** The list title */
  title: string,
  /** The seeMore url */
  seeMoreUrl: string,
  /** The title font color */
  titleColor?: string,
  /** The text to show on the seeMore link */
  seeMoreText: string,
};

export const PromotionCardListTitleRow = ({
  title,
  seeMoreUrl,
  titleColor,
  seeMoreText,
}: Props) => {
  return (
    <div className="u-padding-top--lg">
      <Flex justify="space-between">
        <Flex.Item>
          <ScrollableListTitle paddingLeft title={title} />
        </Flex.Item>
        <Flex.Item align="right" className="u-padding-right--md">
          <a href={seeMoreUrl}>
            <Text
              size="sm"
              tag="h3"
              className={classNames(titleColor && `t-color-${titleColor}`)}
            >
              {seeMoreText}
            </Text>
          </a>
        </Flex.Item>
      </Flex>
    </div>
  );
};
