// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import classNames from "classnames";
import Text from "@casumo/cmp-text";
import type { CellRendererParams } from "react-virtualized";
import { GAME_LIST_IDS } from "Src/constants";
import ScrollableListTitle from "Components/ScrollableListTitle";
import ScrollablePaginated from "Components/ScrollablePaginated";
import type { GameListObject } from "Components/GameListHorizontal/GameListHorizontal";
import type { ClickHandlerType } from "Components/ScrollablePaginated";

import "./GameListHorizontalDesktop.scss";

type Props = {
  tileHeight: number,
  className: string,
  seeMoreText: string,
  seeMoreUrl: string,
  Component: Function,
  list: GameListObject,
};

export const ITEMS_STYLING = {
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]:
    "c-game-list-horizontal-desktop-paginated_live_casino__button",
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]:
    "c-game-list-horizontal-desktop-paginated_live_casino__button",
  default: "c-game-list-horizontal-desktop-paginated__button",
};

export class GameListHorizontalDesktop extends React.PureComponent<Props> {
  cellRenderer: Function;
  buttonRenderer: Function;

  constructor(props: Props) {
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
    const { id } = this.props.list;
    const itemGenericClass = `t-background-white t-border-r--pill o-flex o-flex-align--center o-flex-justify--center u-cursor-pointer
      c-game-list-horizontal-desktop-paginated__button`;
    const itemControlClass = ITEMS_STYLING[id] || ITEMS_STYLING.default;
    return (
      <Flex
        justify="space-between"
        align="center"
        className=" c-game-list-horizontal-desktop-paginated__controls"
      >
        <Flex.Item>
          {hasPreviousPage && (
            <div
              onClick={e => scrollableClickHandler("previous")}
              className={`${itemGenericClass} ${itemControlClass}--left`}
            >
              <DirectionRightIcon className="t-color-grey-dark-3 Icons-c-icon--flip-horiz" />
            </div>
          )}
        </Flex.Item>
        <Flex.Item>
          {hasNextPage && (
            <div
              onClick={e => scrollableClickHandler("next")}
              className={`${itemGenericClass} ${itemControlClass}--right`}
            >
              <DirectionRightIcon className="t-color-grey-dark-3" />
            </div>
          )}
        </Flex.Item>
      </Flex>
    );
  }

  // move this to its own component ?!
  cellRenderer({ columnIndex, style }: CellRendererParams) {
    const { list, className, Component } = this.props;
    const { games: gameIds } = list;
    const numberOfCells = gameIds.length;
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
    const { list, tileHeight, seeMoreUrl, seeMoreText } = this.props;
    const { title, games: gameIds } = list;

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
          className="c-game-list-horizontal-desktop-paginated"
          columnCount={gameIds.length}
          cellRenderer={this.cellRenderer}
          buttonRenderer={this.buttonRenderer}
          height={tileHeight}
        />
      </div>
    );
  }
}
