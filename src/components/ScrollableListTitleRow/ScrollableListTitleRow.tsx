import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import type {
  spacerSizes,
  responsiveSpacerSizes,
} from "@casumo/cudl-react-prop-types";
import { Link } from "@reach/router";
import React, { PureComponent } from "react";
import ScrollableListTitle from "Components/ScrollableListTitle";
import type { SeeMoreProps } from "Components/ScrollableListPaginated";
import { rightPaddingClasses } from "Components/GameListHorizontal/constants";

type OwnProps = {
  /** The list title */
  title: string | undefined;
  /** The seeMore text and url */
  seeMore?: SeeMoreProps;
  /** Whether applying padding left or not */
  paddingLeft?: boolean;
  /** Size to apply on padding left */
  paddingPerDevice?: spacerSizes | responsiveSpacerSizes;
};

type Props = OwnProps & typeof ScrollableListTitleRow.defaultProps;

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
          <Flex.Item className={rightPaddingClasses}>
            <Link to={seeMore?.url} onClick={seeMore?.onClick}>
              <Text tag="h3" className="text-blue-60">
                {seeMore?.text}
              </Text>
            </Link>
          </Flex.Item>
        )}
      </Flex>
    );
  }
}
