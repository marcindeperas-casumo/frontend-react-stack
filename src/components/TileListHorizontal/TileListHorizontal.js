// @flow
import React, { PureComponent } from "react";
import type { Node } from "react";
import { isEmpty, map } from "ramda";
import ScrollableListTitle from "Components/ScrollableListTitle";
import Scrollable from "@casumo/cmp-scrollable";
import Tile from "./Tile";
import { objectToHash } from "Utils";
import TileListHorizontalSkeleton from "Components/TileListHorizontalSkeleton/TileListHorizontalSkeleton";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

const DEFAULT_SPACING = "default";
const DEFAULT_TILE = Tile;

type ItemObject = {
  url: string,
  logo: string,
  background: string,
};

type Props = {
  /** fetches data needed to populate the list */
  fetch: () => void,
  /** title and items to be rendered  */
  title: string,
  items: Array<ItemObject>,
  isLoaded: boolean,
  /** Tile to be rendered */
  Tile: Function,
};

class TileListHorizontal extends PureComponent<Props> {
  static defaultProps = {
    fetch: () => {},
    title: "",
    items: [],
    isLoaded: false,
    Tile: DEFAULT_TILE,
  };

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { title, items, isLoaded, Tile } = this.props;

    if (!isLoaded) {
      return <TileListHorizontalSkeleton />;
    }

    if (isEmpty(items)) {
      return null;
    }

    return (
      <div className="u-padding-top--xlg">
        <ScrollableListTitle title={title} />
        <Scrollable padding={PADDING_PER_DEVICE} itemSpacing={DEFAULT_SPACING}>
          {map(
            item => (
              <Tile key={objectToHash(item)} {...item} />
            ),
            items
          )}
        </Scrollable>
      </div>
    );
  }
}

export default TileListHorizontal;
