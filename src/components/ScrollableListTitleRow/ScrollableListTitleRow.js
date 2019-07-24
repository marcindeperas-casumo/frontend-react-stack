// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import ScrollableListTitle from "Components/ScrollableListTitle";
import type { SeeMoreProps } from "Components/ScrollableListPaginated";

type Props = {
  /** The list title */
  title: string,
  /** The seeMore text, url, and color */
  seeMore?: SeeMoreProps,
};

export class ScrollableListTitleRow extends PureComponent<Props> {
  render() {
    const { title, seeMore } = this.props;

    return (
      <Flex justify="space-between">
        <Flex.Item>
          <ScrollableListTitle title={title} />
        </Flex.Item>
        {seeMore?.url && (
          <Flex.Item className="u-padding-right--md">
            <a href={seeMore?.url}>
              <Text size="xs" tag="h3" className={seeMore?.color}>
                {seeMore?.text}
              </Text>
            </a>
          </Flex.Item>
        )}
      </Flex>
    );
  }
}
