import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import * as React from "react";
import * as R from "ramda";
import { GameRow } from "Components/GameRow";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import * as A from "Types/apollo";
import VirtualList from "Components/VirtualList";
import { PAGE_SIZE } from "Models/gameSearch";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";

export const ROW_HEIGHT = GameRow.ROW_HEIGHT;

type Props<T = A.GameRow_GameFragment> = {
  /** The array of games slugs to render within the AllGamesList */
  games: Array<T>;
  /** The function that triggers the action that fetches the next batch of games */
  fetchMoreRows: (x: { startIndex: number; stopIndex: number }) => Promise<any>;
  /** The total number of rows */
  rowCount: number;
  /** The element to render as a row  */
  renderItem: (game: T) => React.ReactNode;
  /** Variable page size number */
  pageSize?: number;
  /**
   * if this prop will change list will know to update its rows
   * Only changes to this prop will trigger list updates!
   * Changes to games prop will be ignored
   */
  listHash: string;
  /**
   * Sometimes we do not want the row being rounded
   */
  hasRoundedBorder: boolean;
};

export class GamesVirtualList extends React.Component<Props> {
  static defaultProps = {
    pageSize: PAGE_SIZE,
    listHash: "",
    hasRoundedBorder: true,
  };

  constructor(props: Props) {
    super(props);

    this.scrollElement = document.getElementById(ROOT_SCROLL_ELEMENT_ID);
  }

  shouldComponentUpdate(nextProps: Props) {
    return !R.eqProps("listHash", this.props, nextProps);
  }

  scrollElement: HTMLElement | null;

  isRowLoaded = ({ index }: { index: number }) => {
    return Boolean(this.props.games[index]);
  };

  renderRow = ({
    key,
    index,
    style,
  }: {
    key: string;
    index: number;
    style: Object;
  }) => {
    if (!this.isRowLoaded({ index })) {
      return (
        <Flex
          className="t-border-bottom text-grey-0 border-current"
          key={key}
          index={index}
          style={style}
        >
          <GameRowSkeleton />
        </Flex>
      );
    }

    const game = this.props.games[index];
    return (
      <Flex
        className={classNames(
          "t-border-bottom text-grey-0 hover:bg-grey-0 border-current",
          {
            "rounded-lg": this.props.hasRoundedBorder,
            "rounded-none": !this.props.hasRoundedBorder,
          }
        )}
        key={game.id}
        index={index}
        style={style}
        align="center"
      >
        {this.props.renderItem(game)}
      </Flex>
    );
  };

  render() {
    return (
      <VirtualList
        scrollElement={this.scrollElement}
        totalNumberOfRows={this.props.rowCount}
        rowHeight={ROW_HEIGHT}
        loadMoreRows={this.props.fetchMoreRows}
        isRowLoaded={this.isRowLoaded}
        rowRenderer={this.renderRow}
        pageSize={this.props.pageSize}
        listHash={this.props.listHash}
      />
    );
  }
}
