import React, { PureComponent } from "react";
import ScrollingContainer from "@casumo/cmp-scrollable";
import GameListTitle from "Components/GameList/GameListTitle";
import GameTileContainer from "Containers/GameTileContainer";
import ExclusiveGameTileContainer from "Containers/ExclusiveGameTileContainer";
import LiveCasinoCardContainer from "Containers/LiveCasinoCardContainer";
import { isEmpty } from "ramda";

const paddingPerDevice = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

// Question: Should this map live in here or in the container component?
//
// Initially the `Component` property was defined in the container
// (listIdByComponentMap), but then we had the spacing property defined in here
// (listIdBySpacingMap). The issue with this is that the keys of the map
// (listIds) need to be maintained in two different places.
const listIdToRenderDataMap = {
  exclusiveGames: { Component: ExclusiveGameTileContainer },
  liveCasinoGames: { Component: LiveCasinoCardContainer, spacing: "md" },
  liveCasino: { Component: LiveCasinoCardContainer, spacing: "md" },
};

export class ScrollableList extends PureComponent {
  render() {
    const { id, title, games } = this.props;

    if (isEmpty(games)) {
      return null;
    }

    const { Component = GameTileContainer, spacing = "default" } =
      listIdToRenderDataMap[id] || {};

    return (
      <div className="u-padding-top--xlg">
        <div className="u-display--flex">
          <GameListTitle title={title} />
        </div>

        <ScrollingContainer padding={paddingPerDevice} itemSpacing={spacing}>
          {games.map(gameId => (
            <Component key={gameId} id={gameId} />
          ))}
        </ScrollingContainer>
      </div>
    );
  }
}

export default ScrollableList;
