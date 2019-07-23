// @flow
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import { isEmpty } from "ramda";
import type {
  spacerSizes,
  responsiveSpacerSizes,
} from "@casumo/cudl-react-prop-types";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import GameTile from "Components/GameTile";
import ScrollableListTitle from "Components/ScrollableListTitle";

export const DEFAULT_SPACING = "default";
export const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

type Props = {
  title: string,
  /** url to "see more" page, if null will not render "see more" button */
  seeMoreUrl?: string,
  itemIds: Array<string>,
  Component: Function,
  spacing: spacerSizes | responsiveSpacerSizes,
  /** "see more" link translation */
  seeMoreText: string,
  itemClassName?: string,
};

export default class ScrollableList extends PureComponent<Props> {
  static defaultProps = {
    itemIds: [],
    spacing: DEFAULT_SPACING,
    Component: GameTile,
  };

  render() {
    const {
      Component,
      itemIds,
      seeMoreText,
      seeMoreUrl,
      spacing,
      title,
      itemClassName,
    } = this.props;

    if (isEmpty(itemIds)) {
      return null;
    }

    return (
      <div className="u-padding-top--xlg">
        {/* Copied from  MustDropJackpotsList, should be refactored at some point */}
        <Flex justify="space-between">
          <Flex.Item>
            <ScrollableListTitle paddingLeft title={title} />
          </Flex.Item>
          {seeMoreUrl ? (
            <Flex.Item className="u-padding-right--md">
              <a href={seeMoreUrl}>
                <Text size="xs" tag="h3" className="t-color-blue">
                  {seeMoreText}
                </Text>
              </a>
            </Flex.Item>
          ) : null}
        </Flex>
        <Scrollable
          itemClassName={itemClassName}
          padding={PADDING_PER_DEVICE}
          itemSpacing={spacing}
        >
          {itemIds.map(itemId => (
            <Component key={itemId} id={itemId} />
          ))}
        </Scrollable>
      </div>
    );
  }
}
