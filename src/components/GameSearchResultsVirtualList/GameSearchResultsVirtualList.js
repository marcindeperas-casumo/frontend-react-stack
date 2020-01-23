// @flow
import * as React from "react";
import { append, range, assoc } from "ramda";
import Flex from "@casumo/cmp-flex";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import VirtualList from "Components/VirtualList";
import { PAGE_SIZE } from "Models/gameSearch";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";

const ROW_HEIGHT = 80;

type Props = {
  /** The array of games slugs to render within the AllGamesList */
  games: Array<{}>,
  /** The search query for highlighting text in results */
  query: string,
  /** The function that triggers the action that fetches the next batch of games */
  fetchMoreRows: ({
    startIndex: number,
    pageSize: number,
    query: string,
  }) => void,
  /** The total number of rows */
  rowCount: number,
  /** The element to render as a row  */
  renderItem: (game: string) => React.Node,
};

export class GameSearchResultsVirtualList extends React.PureComponent<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);

    this.scrollElement = document.getElementById(ROOT_SCROLL_ELEMENT_ID);
  }

  scrollElement: HTMLElement | null;

  isRowLoaded = ({ index }: { index: number }) => {
    console.log(
      "Is row loaded",
      index,
      this.props.games[index],
      this.props.games,
      this.props.games.length
    );
    return Boolean(this.props.games[index]);
  };

  renderRow = ({
    key,
    index,
    style,
  }: {
    key: string,
    index: number,
    style: Object,
  }) => {
    if (!this.isRowLoaded({ index })) {
      return (
        <Flex
          className="u-padding-x--md"
          align="center"
          key={key}
          index={index}
          style={style}
        >
          <GameRowSkeleton />
        </Flex>
      );
    }

    return (
      <div
        className="u-padding-x--md u-padding-y t-border-bottom t-color-chrome-light-2 t-border--current-color"
        key={key}
        index={index}
        style={style}
      >
        {this.props.renderItem(this.props.games[index])}
      </div>
    );
  };

  fetchMoreRows = ({ startIndex, stopIndex }) => {
    console.log("snarf", startIndex, stopIndex);
    const { games } = this.props;

    if (games[stopIndex]) {
      return Promise.resolve(games);
    }

    return this.props.fetchMoreRows().then(newGames => {
      return newGames;
    });
  };

  render() {
    return (
      <VirtualList
        scrollElement={this.scrollElement}
        totalNumberOfRows={this.props.rowCount}
        rowHeight={ROW_HEIGHT}
        loadMoreRows={this.fetchMoreRows}
        isRowLoaded={this.isRowLoaded}
        rowRenderer={this.renderRow}
        pageSize={PAGE_SIZE}
      />
    );
  }
}
