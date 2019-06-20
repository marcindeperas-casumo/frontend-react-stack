// @flow
import React, { PureComponent } from "react";
import { isEmpty, isNil } from "ramda";
import { Desktop, Mobile } from "Components/ResponsiveLayout";
import { GAME_LIST_IDS } from "Src/constants";
import ScrollableList from "Components/ScrollableList";
import GameTileExclusiveContainer from "Components/GameTileExclusive";
import LiveCasinoCardContainer from "Components/LiveCasinoCard";
import GameTileContainer from "Components/GameTile";
import GameTileWithActiveOverlay from "Components/GameTileWithActiveOverlay";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { GameListHorizontalDesktop } from "Components/GameListHorizontal/GameListHorizontalDesktop";

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

export const PADDING_PER_DEVICE = {
  default: "md",
  tablet: "3xlg",
  desktop: "3xlg",
};

export const ITEM_RENDERERS = {
  [GAME_LIST_IDS.EXCLUSIVE_GAMES]: GameTileExclusiveContainer,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: LiveCasinoCardContainer,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: LiveCasinoCardContainer,
  [GAME_LIST_IDS.LATEST_PLAYED_GAMES]: GameTileWithActiveOverlay,
  default: GameTileContainer,
};

export const ITEM_RENDERERS_HEIGHTS = {
  [GAME_LIST_IDS.EXCLUSIVE_GAMES]: 280,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: 290,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: 290,
  [GAME_LIST_IDS.LATEST_PLAYED_GAMES]: 204,
  default: 204,
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
    const hasNoGames = isEmpty(gameIds) || isNil(gameIds);
    const seeMoreUrl = SEE_MORE_URL[id];
    const Component = ITEM_RENDERERS[id] || ITEM_RENDERERS.default;
    const className = GAME_LIST_CLASS_NAME[id] || GAME_LIST_CLASS_NAME.default;
    const spacing = ITEM_SPACING[id] || ITEM_SPACING.default;
    const tileHeight =
      ITEM_RENDERERS_HEIGHTS[id] || ITEM_RENDERERS_HEIGHTS.default;

    if (isLoading) {
      return <GameListHorizontalSkeleton key={`game-list-skeleton-${id}`} />;
    }

    if (hasNoGames) {
      return null;
    }

    return (
      <>
        <Mobile>
          <ScrollableList
            itemClassName={className}
            title={title}
            seeMoreText={seeMoreText}
            seeMoreUrl={seeMoreUrl}
            itemIds={gameIds}
            Component={Component}
            spacing={spacing}
          />
        </Mobile>
        <Desktop>
          <GameListHorizontalDesktop
            list={list}
            Component={Component}
            className={className}
            tileHeight={tileHeight}
            seeMoreUrl={seeMoreUrl}
            seeMoreText={seeMoreText}
          />
        </Desktop>
      </>
    );
  }
}
