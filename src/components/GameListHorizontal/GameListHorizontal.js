// @flow
import React, { PureComponent } from "react";
import { isEmpty, isNil } from "ramda";
import Flex from "@casumo/cmp-flex";
import { ArrowRightIcon, ArrowLeftIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import classNames from "classnames";
import { GAME_LIST_IDS } from "Src/constants";
import ScrollableList from "Components/ScrollableList";
import ScrollablePaginated from "Components/ScrollablePaginated";
import ScrollableListTitle from "Components/ScrollableListTitle";
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

// export const ITEM_SPACING = {
//   [GAME_LIST_IDS.LIVE_CASINO_GAMES]: "md",
//   [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: "md",
//   default: "default",
// };

export class GameListHorizontal extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.cellRenderer = this.cellRenderer.bind(this);
    this.buttonRenderer = this.buttonRenderer.bind(this);
  }

  // move this to its own component
  buttonRenderer(
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    scrollableClickHandler: ClickHandlerType
  ) {
    return (
      <Flex justify="space-between">
        <Flex.Item>
          {hasPreviousPage && (
            <div
              onClick={e => scrollableClickHandler("previous")}
              className="t-background-grey-dark-3 t-border-r--circle u-padding--md u-cursor-pointer"
            >
              <ArrowLeftIcon className="t-color-grey-light-3" />
            </div>
          )}
        </Flex.Item>
        <Flex.Item>
          {hasNextPage && (
            <div
              onClick={e => scrollableClickHandler("next")}
              className="t-background-grey-dark-3 t-border-r--circle u-padding--md u-cursor-pointer"
            >
              <ArrowRightIcon className="t-color-grey-light-3" />
            </div>
          )}
        </Flex.Item>
      </Flex>
    );
  }

  // move this to its own component ?!
  cellRenderer({ columnIndex, style }: CellRendererParams) {
    const { list } = this.props;
    const { id, games: gameIds } = list;
    const numberOfCells = gameIds.length;
    const Component = ITEM_RENDERERS[id] || ITEM_RENDERERS.default;
    const className = GAME_LIST_CLASS_NAME[id] || GAME_LIST_CLASS_NAME.default;
    const paddingClassNames = classNames(
      columnIndex <= numberOfCells - 1 && "u-padding-right",
      columnIndex === 0 && "u-padding-left--3xlg",
      columnIndex === numberOfCells - 1 && "u-padding-right--3xlg"
    );
    const gameId = gameIds[columnIndex];

    return (
      <div style={style}>
        <div className={paddingClassNames}>
          <div className={className}>
            <Component key={gameId} id={gameId} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { list, isLoading, seeMoreText } = this.props;
    const { id, title, games: gameIds } = list;
    const hasNoGames = isEmpty(gameIds) || isNil(gameIds);
    const seeMoreUrl = SEE_MORE_URL[id];
    const tileHeight =
      ITEM_RENDERERS_HEIGHTS[id] || ITEM_RENDERERS_HEIGHTS.default;

    if (isLoading) {
      return <GameListHorizontalSkeleton key={`game-list-skeleton-${id}`} />;
    }

    if (hasNoGames) {
      return null;
    }

    // This needs to be refactored. We need a conditional rendering. Either <ScrollableList> or <ScrollablePaginated>
    return (
      <div className="u-padding-top--xlg">
        {/* Copied from  MustDropJackpotsList, should be refactored at some point */}
        <Flex justify="space-between">
          <Flex.Item>
            <ScrollableListTitle title={title} />
          </Flex.Item>
          {seeMoreUrl ? (
            <Flex.Item className="u-padding-right--md">
              <a href={seeMoreUrl}>
                <Text size="xs" tag="h3" className="t-color-blue">
                  {seeMoreText}
                </Text>
              </a>
            </Flex.Item>
          ) : null}
        </Flex>
        <ScrollablePaginated
          columnCount={gameIds.length}
          cellRenderer={this.cellRenderer}
          buttonRenderer={this.buttonRenderer}
          height={tileHeight}
        />
      </div>
    );
  }
}
