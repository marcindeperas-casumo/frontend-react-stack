// @flow
import React, { PureComponent } from "react";
import { isEmpty, isNil } from "ramda";
import { GAME_LIST_IDS } from "Src/constants";
import ScrollableList from "Components/ScrollableList";
import GameTileExclusiveContainer from "Components/GameTileExclusive";
import LiveCasinoCardContainer from "Components/LiveCasinoCard";
import GameTileContainer from "Components/GameTile";
import GameTileWithActiveOverlay from "Components/GameTileWithActiveOverlay";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";

import "./GameListHorizontal.scss";

export type GameListObject = {
  id: string,
  title: string,
  games: Array<string>,
};

export type Props = {
  /** The game list object got from the store. */
  list: GameListObject,
  isLoading: boolean,
  /** "see more" link translation */
  seeMoreText: string,
};

export const ITEM_RENDERERS = {
  [GAME_LIST_IDS.EXCLUSIVE_GAMES]: GameTileExclusiveContainer,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: LiveCasinoCardContainer,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: LiveCasinoCardContainer,
  [GAME_LIST_IDS.LATEST_PLAYED_GAMES]: GameTileWithActiveOverlay,
  default: GameTileContainer,
};

const GAME_LIST_CLASS_NAME = {
  [GAME_LIST_IDS.EXCLUSIVE_GAMES]: "c-exclusive-game",
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: "c-live-casino-card",
  default: "c-top-game",
};

const SEE_MORE_URL = {
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: "/games/live-casino-details",
};

export const ITEM_SPACING = {
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: "md",
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: "md",
  default: "default",
};

export class GameListHorizontal extends PureComponent<Props> {
  render() {
    const { list, isLoading, seeMoreText } = this.props;
    const { id, title, games: gameIds } = list;
    const spacing = ITEM_SPACING[id] || ITEM_SPACING.default;
    const className = GAME_LIST_CLASS_NAME[id] || GAME_LIST_CLASS_NAME.default;
    const Component = ITEM_RENDERERS[id] || ITEM_RENDERERS.default;
    const hasNoGames = isEmpty(gameIds) || isNil(gameIds);
    const seeMoreUrl = SEE_MORE_URL[id];

    if (isLoading) {
      return <GameListHorizontalSkeleton key={`game-list-skeleton-${id}`} />;
    }

    if (hasNoGames) {
      return null;
    }

    return (
      <ScrollableList
        itemClassName={className}
        title={title}
        seeMoreText={seeMoreText}
        seeMoreUrl={seeMoreUrl}
        itemIds={gameIds}
        Component={Component}
        spacing={spacing}
      />
    );
  }
}
