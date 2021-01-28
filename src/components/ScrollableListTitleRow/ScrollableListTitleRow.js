// @flow
import React, { PureComponent } from "react";
import { Link } from "@reach/router";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import type {
  spacerSizes,
  responsiveSpacerSizes,
} from "@casumo/cudl-react-prop-types";
import ScrollableListTitle from "Components/ScrollableListTitle";
import type { SeeMoreProps } from "Components/ScrollableListPaginated";

type Props = {
  /** The list title */
  title: ?string,
  /** The seeMore text and url */
  seeMore?: SeeMoreProps,
  /** Whether applying padding left or not */
  paddingLeft?: boolean,
  /** Size to apply on padding left */
  paddingPerDevice?: spacerSizes | responsiveSpacerSizes,
};

export class ScrollableListTitleRow extends PureComponent<Props> {
  static defaultProps = {
    paddingLeft: false,
  };

  render() {
    const { title, seeMore, paddingLeft, paddingPerDevice } = this.props;

    return (
      <Flex justify="space-between">
        <Flex.Item>
          <ScrollableListTitle
            paddingLeft={paddingLeft}
            paddingPerDevice={paddingPerDevice}
            title={title}
          />
        </Flex.Item>
        {seeMore?.url && (
          <Flex.Item className="u-padding-right--md">
            <Link to={seeMore?.url}>
              <Text tag="h3" className="t-color-blue-60">
                {seeMore?.text}
              </Text>
            </Link>
          </Flex.Item>
        )}
      </Flex>
    );
  }
}
