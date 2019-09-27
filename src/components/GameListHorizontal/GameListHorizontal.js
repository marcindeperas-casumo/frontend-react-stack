// @flow
import React, { PureComponent } from "react";
import { isEmpty, isNil } from "ramda";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, Mobile } from "Components/ResponsiveLayout";
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
  /** The game list object is being loaded. */
  isLoading: boolean,
  /** "see more" link translation */
  seeMoreText: string,
};

export const ITEM_RENDERERS = {
  [GAME_LIST_IDS.EXCLUSIVE_GAMES]: GameTileExclusiveContainer,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: LiveCasinoCardContainer,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: LiveCasinoCardContainer,
  [GAME_LIST_IDS.LATEST_PLAYED_GAMES]: GameTileWithActiveOverlay,
  [GAME_LIST_IDS.MY_LIST]: GameTileWithActiveOverlay,
  default: GameTileContainer,
};

export const TILE_HEIGHTS = {
  [GAME_LIST_IDS.EXCLUSIVE_GAMES]: 280,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: 305,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: 305,
  [GAME_LIST_IDS.LATEST_PLAYED_GAMES]: 204,
  default: 204,
};

const GAME_LIST_CLASS_NAME = {
  [GAME_LIST_IDS.EXCLUSIVE_GAMES]: "c-exclusive-game",
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: "c-live-casino-card u-margin-bottom--sm",
  default: "c-top-game",
};

const SEE_MORE_URL = {
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: "/games/live-casino-details",
};

export const ITEMS_CONTROL_STYLING = {
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]:
    "c-scrollable-list-paginated__live_casino-button",
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]:
    "c-scrollable-list-paginated__live_casino-button",
  default: "c-scrollable-list-paginated__button",
};

export class GameListHorizontal extends PureComponent<Props> {
  render() {
    const { list, isLoading, seeMoreText } = this.props;
    const { id, title, games: itemIds } = list;
    const hasNoGames = isEmpty(itemIds) || isNil(itemIds);
    const seeMoreUrl = SEE_MORE_URL[id];
    const itemRenderer = ITEM_RENDERERS[id] || ITEM_RENDERERS.default;
    const className = GAME_LIST_CLASS_NAME[id] || GAME_LIST_CLASS_NAME.default;
    const tileHeight = TILE_HEIGHTS[id] || TILE_HEIGHTS.default;
    const itemControlClass =
      ITEMS_CONTROL_STYLING[id] || ITEMS_CONTROL_STYLING.default;

    if (isLoading) {
      return (
        <div className="o-wrapper">
          <GameListHorizontalSkeleton key={`game-list-skeleton-${id}`} />
        </div>
      );
    }

    if (hasNoGames) {
      return null;
    }

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <Mobile>
            <ScrollableList
              itemClassName={className}
              title={title}
              seeMoreText={seeMoreText}
              seeMoreUrl={seeMoreUrl}
              itemIds={itemIds}
              Component={itemRenderer}
            />
          </Mobile>
          <Desktop>
            <ScrollableListPaginated
              list={{
                title,
                itemIds,
              }}
              Component={itemRenderer}
              className={className}
              itemControlClass={itemControlClass}
              tileHeight={tileHeight}
              seeMore={{
                text: seeMoreText,
                url: seeMoreUrl,
              }}
            />
          </Desktop>
        </div>
      </div>
    );
  }
}
