// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import { isEmpty } from "ramda";
import type { CellRendererParams } from "react-virtualized";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableListTitle from "Components/ScrollableListTitle";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import GameProvidersListSkeleton from "./GameProvidersListSkeleton";
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

const SPACER_CLASSES = createModifierClasses("u-margin-left", "md");

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

  desktopItemRenderer = ({ columnIndex, style }: CellRendererParams) => {
    const gameProvider = this.itemsWithBackground[columnIndex];
    const isNotFirstElement = columnIndex > 0;
    const elementClassNames = classNames(
      "u-height--full",
      isNotFirstElement && SPACER_CLASSES
    );

    return (
      <div style={style}>
        <div className={`${elementClassNames} c-game-provider-avatar`}>
          <GameProviderAvatar {...gameProvider} />
        </div>
      </div>
    );
  };

  render() {
    const { title, items, isLoaded } = this.props;

    if (!isLoaded) {
      return <GameProvidersListSkeleton />;
    }

    if (isEmpty(items)) {
      return null;
    }

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <MobileAndTablet>
            <div className="u-padding-top--xlg">
              <ScrollableListTitle paddingLeft title={title} />
              <Scrollable
                numberOfItems={this.itemsWithBackground.length}
                keyGetter={this.keyGetter}
                itemRenderer={this.itemRenderer}
                itemClassName="c-game-provider-avatar"
                padding={PADDING_PER_DEVICE}
                itemSpacing={DEFAULT_SPACING}
              />
            </div>
          </MobileAndTablet>
          <Desktop>
            <ScrollableListPaginated
              list={this.itemsWithBackground}
              listTitle={title}
              itemRenderer={this.desktopItemRenderer}
              itemControlClass="c-scrollable-list-paginated__button"
              tileHeight={160}
            />
          </Desktop>
        </div>
      </div>
    );
  }
}

export default GameProvidersList;
