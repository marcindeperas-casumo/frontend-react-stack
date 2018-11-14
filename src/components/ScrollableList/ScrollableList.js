// @flow
import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableListTitle from "Components/ScrollableListTitle";
import GameTileContainer from "Components/GameTile";
import { isEmpty } from "ramda";
import type {
  spacerSizes,
  responsiveSpacerSizes,
} from "@casumo/cudl-react-prop-types";

export const DEFAULT_SPACING = "default";
export const DEFAULT_COMPONENT = GameTileContainer;
export const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

type Props = {
  title: string,
  itemIds: Array<string>,
  Component?: Function,
  spacing?: spacerSizes | responsiveSpacerSizes,
};

export class ScrollableList extends PureComponent<Props> {
  render() {
    const {
      title,
      itemIds = [],
      spacing = DEFAULT_SPACING,
      Component = DEFAULT_COMPONENT,
    } = this.props;

    if (isEmpty(itemIds)) {
      return null;
    }

    return (
      <div className="u-padding-top--xlg">
        <ScrollableListTitle title={title} />
        <Scrollable padding={PADDING_PER_DEVICE} itemSpacing={spacing}>
          {itemIds.map(itemId => (
            <Component key={itemId} id={itemId} />
          ))}
        </Scrollable>
      </div>
    );
  }
}

export default ScrollableList;
