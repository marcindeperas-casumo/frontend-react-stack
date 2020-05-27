// @flow
import React, { PureComponent } from "react";
import { Link } from "@reach/router";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import ScrollableListTitle from "Components/ScrollableListTitle";
import type { SeeMoreProps } from "Components/ScrollableListPaginated";

type Props = {
  /** The list title */
  title: ?string,
  /** The seeMore text, url, and color */
  seeMore?: SeeMoreProps,
  /** Whether applying padding left or not */
  paddingLeft?: boolean,
};

export class ScrollableListTitleRow extends PureComponent<Props> {
  static defaultProps = {
    paddingLeft: false,
  };

  render() {
    const { title, seeMore, paddingLeft } = this.props;

    return (
      <Flex justify="space-between">
        <Flex.Item>
          <ScrollableListTitle paddingLeft={paddingLeft} title={title} />
        </Flex.Item>
        {seeMore?.url && (
          <Flex.Item className="u-padding-right--md">
            <Link to={seeMore?.url}>
              <Text tag="h3" className={seeMore?.color || "t-color-text-link"}>
                {seeMore?.text}
              </Text>
            </Link>
          </Flex.Item>
        )}
      </Flex>
    );
  }
}
