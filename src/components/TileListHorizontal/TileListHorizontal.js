// @flow
import React, { PureComponent } from "react";
import { isEmpty } from "ramda";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableListTitle from "Components/ScrollableListTitle";
import TileListHorizontalSkeleton from "Components/TileListHorizontalSkeleton/TileListHorizontalSkeleton";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, Mobile } from "Components/ResponsiveLayout";
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
    const itemsWithBackground = items.filter(item => item.background !== null);
    const itemRenderer = ({ id, ...props }) => <Tile key={id} {...props} />;
    const scrollableChildren = itemsWithBackground.map(itemRenderer);

    if (!isLoaded) {
      return <TileListHorizontalSkeleton />;
    }

    if (isEmpty(items)) {
      return null;
    }

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <Mobile>
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
          </Mobile>
          <Desktop>
            <ScrollableListPaginated
              list={{
                title: title,
                itemIds: itemsWithBackground,
              }}
              // we are bond to use "id" because of the cellRenderer method inside ScrollableListPaginated.js
              Component={({ id: item }) => <Tile {...item} />}
              className="c-tile"
              itemControlClass="c-scrollable-list-paginated__button"
              tileHeight={160}
              itemSpacing="md"
            />
          </Desktop>
        </div>
      </div>
    );
  }
}

export default TileListHorizontal;
