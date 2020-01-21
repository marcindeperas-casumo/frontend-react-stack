// @flow
import React, { PureComponent } from "react";
import { isEmpty, isNil } from "ramda";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { Desktop, MobileAndTablet } from "Components/ResponsiveLayout";
import { GAME_LIST_IDS } from "Src/constants";
import ScrollableList from "Components/ScrollableList";
import { GameTileExclusive as GameTileExclusiveContainer } from "Components/GameTileExclusive";
import { LiveCasinoCard as LiveCasinoCardContainer } from "Components/LiveCasinoCard";
import { GameTile as GameTileContainer } from "Components/GameTile";
import * as A from "Types/apollo";

import "./GameListHorizontal.scss";

export type GameListObject = {
  id: string,
  title: string,
  games: Array<A.gameListQuery_gamesList_games>,
};

export type Props = {
  /** The game list object. */
  list: GameListObject,
  /** "see more" link translation */
  seeMoreText: string,
};

export const ITEM_RENDERERS = {
  [GAME_LIST_IDS.EXCLUSIVE_GAMES]: GameTileExclusiveContainer,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: LiveCasinoCardContainer,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: LiveCasinoCardContainer,
  default: GameTileContainer,
};

export const TILE_HEIGHTS = {
  [GAME_LIST_IDS.EXCLUSIVE_GAMES]: 300,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: 305,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: 305,
  [GAME_LIST_IDS.LATEST_PLAYED_GAMES]: 212,
  default: 212,
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
    const { list, seeMoreText } = this.props;
    const { id, title, games } = list;
    const hasNoGames = isEmpty(games) || isNil(games);
    const seeMoreUrl = SEE_MORE_URL[id];
    const itemRenderer = ITEM_RENDERERS[id] || ITEM_RENDERERS.default;
    const className = GAME_LIST_CLASS_NAME[id] || GAME_LIST_CLASS_NAME.default;
    const tileHeight = TILE_HEIGHTS[id] || TILE_HEIGHTS.default;
    const itemControlClass =
      ITEMS_CONTROL_STYLING[id] || ITEMS_CONTROL_STYLING.default;

    if (hasNoGames) {
      return null;
    }

    return (
      <div className="u-margin-x--3xlg@desktop">
        <div className="o-wrapper">
          <MobileAndTablet>
            <ScrollableList
              itemClassName={className}
              title={title}
              seeMoreText={seeMoreText}
              seeMoreUrl={seeMoreUrl}
              items={games}
              Component={itemRenderer}
            />
          </MobileAndTablet>
          <Desktop>
            <ScrollableListPaginated
              list={{
                title,
                itemIds: games,
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
