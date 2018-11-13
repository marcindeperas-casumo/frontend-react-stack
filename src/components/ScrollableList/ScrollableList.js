import React, { PureComponent } from "react";
import Scrollable from "@casumo/cmp-scrollable";
import ScrollableListTitle from "Components/ScrollableListTitle";
import GameTileContainer from "Containers/GameTileContainer";
import GameTileExclusiveContainer from "Containers/GameTileExclusiveContainer";
import LiveCasinoCardContainer from "Components/LiveCasinoCard";
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
  exclusiveGames: { Component: GameTileExclusiveContainer },
  liveCasinoGames: { Component: LiveCasinoCardContainer, spacing: "md" },
  liveCasino: { Component: LiveCasinoCardContainer, spacing: "md" },
};

export class ScrollableList extends PureComponent {
  render() {
    const { id, title, games = [] } = this.props;

    if (isEmpty(games)) {
      return null;
    }

    const { Component = GameTileContainer, spacing = "default" } =
      listIdToRenderDataMap[id] || {};

    return (
      <div className="u-padding-top--xlg">
        <ScrollableListTitle title={title} />
        <Scrollable padding={paddingPerDevice} itemSpacing={spacing}>
          {games.map(gameId => (
            <Component key={gameId} id={gameId} />
          ))}
        </Scrollable>
      </div>
    );
  }
}

export default ScrollableList;
