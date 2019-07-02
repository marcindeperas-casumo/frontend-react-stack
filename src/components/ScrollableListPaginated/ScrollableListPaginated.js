// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { DirectionRightIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import type { CellRendererParams } from "react-virtualized";
import { GAME_LIST_IDS } from "Src/constants";
import ScrollableListTitle from "Components/ScrollableListTitle";
import ScrollablePaginated from "Components/ScrollablePaginated";
import type { GameListObject } from "Components/GameListHorizontal/GameListHorizontal";
import type { ClickHandlerType } from "Components/ScrollablePaginated";

import "./ScrollableListPaginated.scss";

type Props = {
  /** The item height. */
  tileHeight: number,
  /** The style to apply to the list items. */
  className?: string,
  /** The text to render on the seeMore button. */
  seeMoreText?: string,
  /** The link where to redirect once clicking the seeMore button. */
  seeMoreUrl?: string,
  /** The item renderer. */
  Component: Function,
  /** The list of items to be rendered. */
  list: GameListObject,
};

export const ITEMS_STYLING = {
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]:
    "c-game-list-horizontal-desktop-paginated_live_casino__button",
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]:
    "c-game-list-horizontal-desktop-paginated_live_casino__button",
  default: "c-game-list-horizontal-desktop-paginated__button",
};

export default class ScrollableListPaginated extends React.PureComponent<Props> {
  buttonRenderer = (
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    scrollableClickHandler: ClickHandlerType
  ) => {
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
  };

  cellRenderer = ({ columnIndex, style }: CellRendererParams) => {
    const { list, className, Component } = this.props;
    const { games: gameIds } = list;
    const gameId = gameIds[columnIndex];

    return (
      <div style={style}>
        <div className="u-padding-right">
          <div className={className}>
            <Component key={gameId} id={gameId} />
          </div>
        </div>
      </div>
    );
  };
  render() {
    const { list, tileHeight, seeMoreUrl, seeMoreText } = this.props;
    const { title, games: gameIds } = list;

    return (
      <div className="u-padding-top--xlg">
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
