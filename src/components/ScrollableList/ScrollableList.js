// @flow
import * as React from "react";
import Scrollable from "@casumo/cmp-scrollable";
import { isEmpty } from "ramda";
import type {
  spacerSizes,
  responsiveSpacerSizes,
} from "@casumo/cudl-react-prop-types";
import { GameTile } from "Components/GameTile";
import { ScrollableListTitleRow } from "Components/ScrollableListTitleRow";

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
  items: Array<any>,
  Component: Function,
  spacing: spacerSizes | responsiveSpacerSizes,
  /** "see more" link translation */
  seeMoreText?: string,
  itemClassName?: string,
  itemRenderer: (i: number) => React.Node,
};

export default class ScrollableList extends React.PureComponent<Props> {
  static defaultProps = {
    items: [],
    spacing: DEFAULT_SPACING,
    Component: GameTile,
  };

  keyGetter = (i: number) => this.props.items[i].id;

  // itemRenderer = (i: number) => {
  //   const { Component, items } = this.props;
  //   return <Component item={items[i]} />;
  // };

  render() {
    const {
      items,
      seeMoreText,
      seeMoreUrl,
      spacing,
      title,
      itemClassName,
      itemRenderer,
    } = this.props;

    if (isEmpty(items)) {
      return null;
    }

    return (
      <div className="u-padding-top--xlg">
        <ScrollableListTitleRow
          paddingLeft
          seeMore={{ text: seeMoreText, url: seeMoreUrl }}
          title={title}
        />
        <Scrollable
          numberOfItems={items.length}
          keyGetter={this.keyGetter}
          itemRenderer={itemRenderer}
          itemClassName={itemClassName}
          padding={PADDING_PER_DEVICE}
          itemSpacing={spacing}
        />
      </div>
    );
  }
}
