// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import { GameRow } from "Components/GameRow";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import * as A from "Types/apollo";
import VirtualList from "Components/VirtualList";
import { PAGE_SIZE } from "Models/gameSearch";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";
import "./GamesVirtualList.scss";

export const ROW_HEIGHT = GameRow.ROW_HEIGHT;

type OwnProps = {
    /** The array of games slugs to render within the AllGamesList */
    games: Array<any>;
    /** The function that triggers the action that fetches the next batch of games */
    fetchMoreRows: Function;
    // @ts-expect-error ts-migrate(2368) FIXME: Type parameter name cannot be 'any'.
    Promise<any>();
    /** The total number of rows */
    rowCount: number;
    /** The element to render as a row  */
    // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
    renderItem: (game: A.GameRow_Game) => React.Node;
    /** Variable page size number */
    pageSize: number;
    /**
     * if this prop will change list will know to update its rows
     * Only changes to this prop will trigger list updates!
     * Changes to games prop will be ignored
     */
    listHash: string;
};

// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ <T, U>(prop: string, obj1: T, ... Remove this comment to see the full error message
const nEqProps = R.complement(R.eqProps);

type Props = OwnProps & typeof GamesVirtualList.defaultProps;
export class GamesVirtualList extends React.Component<Props> {
  static defaultProps = {
    pageSize: PAGE_SIZE,
    listHash: "",
  };

  constructor(props: Props) {
    super(props);

    this.scrollElement = document.getElementById(ROOT_SCROLL_ELEMENT_ID);
  }

  shouldComponentUpdate(nextProps: Props) {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 3.
    return nEqProps("listHash", this.props, nextProps);
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
    key: string,
    index: number,
    style: Object,
  }) => {
    if (!this.isRowLoaded({ index })) {
      return (
        <Flex
          className="t-border-bottom t-color-grey-0 t-border-current"
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
        className="t-border-bottom t-color-grey-0 t-background-grey-0:hover t-border-current c-game-virtual-list-row"
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
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        loadMoreRows={this.props.fetchMoreRows}
        isRowLoaded={this.isRowLoaded}
        rowRenderer={this.renderRow}
        pageSize={this.props.pageSize}
        listHash={this.props.listHash}
      />
    );
  }
}
