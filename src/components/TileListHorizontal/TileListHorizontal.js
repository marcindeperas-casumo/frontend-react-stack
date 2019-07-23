// @flow
import React, { PureComponent } from "react";
import { isEmpty, map } from "ramda";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableListTitle from "Components/ScrollableListTitle";
import TileListHorizontalSkeleton from "Components/TileListHorizontalSkeleton/TileListHorizontalSkeleton";
import Tile from "./Tile";

const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

const DEFAULT_SPACING = "default";

type ItemObject = {
  id: string,
  url: string,
  logo: string,
  background: string,
};

type Props = {
  /** fetches data needed to populate the list */
  fetch: () => void,
  title: string,
  items: Array<ItemObject>,
  isLoaded: boolean,
};

class TileListHorizontal extends PureComponent<Props> {
  static defaultProps = {
    fetch: () => {},
    title: "",
    items: [],
    isLoaded: false,
  };

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { title, items, isLoaded } = this.props;
    const scrollableChildren = map(
      ({ id, ...rest }) => <Tile key={id} {...rest} />,
      items.filter(item => item.background !== null)
    );

    if (!isLoaded) {
      return <TileListHorizontalSkeleton />;
    }

    if (isEmpty(items)) {
      return null;
    }

    return (
      <div className="u-padding-top--xlg">
        <ScrollableListTitle paddingLeft title={title} />
        <Scrollable
          itemClassName="c-tile"
          padding={PADDING_PER_DEVICE}
          itemSpacing={DEFAULT_SPACING}
        >
          {scrollableChildren}
        </Scrollable>
      </div>
    );
  }
}

export default TileListHorizontal;
