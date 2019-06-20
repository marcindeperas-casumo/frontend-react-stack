// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ArrowRightIcon, ArrowLeftIcon } from "@casumo/cmp-icons";
import classNames from "classnames";
import Text from "@casumo/cmp-text";
import type { CellRendererParams } from "react-virtualized";
import ScrollableListTitle from "Components/ScrollableListTitle";
import ScrollablePaginated from "Components/ScrollablePaginated";
import type { GameListObject } from "Components/GameListHorizontal/GameListHorizontal";
import type { ClickHandlerType } from "Components/ScrollablePaginated";

type Props = {
  tileHeight: number,
  className: string,
  seeMoreText: string,
  seeMoreUrl: string,
  Component: Function,
  list: GameListObject,
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
          columnCount={gameIds.length}
          cellRenderer={this.cellRenderer}
          buttonRenderer={this.buttonRenderer}
          height={tileHeight}
        />
      </div>
    );
  }
}
