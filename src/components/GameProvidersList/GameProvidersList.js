// @flow
import React, { PureComponent } from "react";
import { isEmpty } from "ramda";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableListTitle from "Components/ScrollableListTitle";
import TileListHorizontalSkeleton from "Components/TileListHorizontalSkeleton/TileListHorizontalSkeleton";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, Mobile } from "Components/ResponsiveLayout";
import GameProviderAvatar from "./GameProviderAvatar";

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

class GameProvidersList extends PureComponent<Props> {
  static defaultProps = {
    fetch: () => {},
    title: "",
    items: [],
    isLoaded: false,
  };

  componentDidMount() {
    this.props.fetch();
  }

  keyGetter = (i: number) => {
    return this.props.items[i].id;
  };

  get itemsWithBackground(): Array<ItemObject> {
    return this.props.items.filter(item => item.background !== null);
  }

  itemRenderer = (i: number) => {
    return <GameProviderAvatar {...this.itemsWithBackground[i]} />;
  };

  render() {
    const { title, items, isLoaded } = this.props;

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
                numberOfItems={this.itemsWithBackground.length}
                keyGetter={this.keyGetter}
                itemRenderer={this.itemRenderer}
                itemClassName="c-tile"
                padding={PADDING_PER_DEVICE}
                itemSpacing={DEFAULT_SPACING}
              />
            </div>
          </Mobile>
          <Desktop>
            <ScrollableListPaginated
              list={{
                title: title,
                itemIds: this.itemsWithBackground,
              }}
              // we are bound to "id" because of the cellRenderer method inside <ScrollableListPaginated />
              Component={({ id: item }) => <GameProviderAvatar {...item} />}
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

export default GameProvidersList;
