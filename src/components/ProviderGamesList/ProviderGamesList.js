// @flow
import React, { PureComponent } from "react";
import { nth, contains } from "ramda";
import Flex from "@casumo/cmp-flex";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import { GameRow } from "Components/GameRow";
import { ErrorMessage } from "Components/ErrorMessage";
import { EVENT_PROPS, ROOT_SCROLL_ELEMENT_ID } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import VirtualList from "Components/VirtualList";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import "./ProviderGamesList.scss";

type ProviderObject = {
  name: string,
  games: Array<string>,
};

type Props = {
  /** the function that fetches the games */
  fetchGames: (page: number, pageSize: number) => void,
  /**  has the game list completed loading? */
  areGamesLoaded: boolean,
  error?: string,
  provider: ProviderObject,
  count: number,
};

type State = {
  currentPage: number,
  requestedPages: Array<number>,
};

const PAGE_SIZE = 50;
const ROW_HEIGHT = 104;

class ProviderGamesList extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.scrollElement = document.getElementById(ROOT_SCROLL_ELEMENT_ID);
  }

  static defaultProps = {
    fetchGames: () => {},
    areGamesLoaded: false,
    provider: {},
    count: 0,
  };

  state = {
    currentPage: 0,
    requestedPages: [],
  };

  scrollElement: HTMLElement | null;

  componentDidMount() {
    this.props.fetchGames(this.state.currentPage, PAGE_SIZE);
  }

  isRowLoaded = ({ index }: { index: number }) => {
    const { games } = this.props.provider;
    return Boolean(nth(index, games));
  };

  loadMoreRows = ({ stopIndex }: { stopIndex: number }) => {
    const page = Math.ceil(stopIndex / PAGE_SIZE) - 1;
    const pages = this.state.requestedPages;
    this.setState(({ currentPage }) => ({ currentPage: page }));
    if (!contains(page, pages)) {
      this.setState(({ requestedPages }) => ({
        requestedPages: [...requestedPages, page],
      }));
      this.props.fetchGames(page, PAGE_SIZE);
    }
    return Promise.resolve();
  };

  rowRenderer = ({
    key,
    index,
    style,
  }: {
    key: string,
    index: number,
    style: string,
  }) => {
    if (this.isRowLoaded({ index })) {
      const { games } = this.props.provider;
      return (
        <div
          key={key}
          className="u-padding-x--md t-border-bottom"
          index={index}
          style={style}
        >
          <GameRow id={nth(index, games)} />
        </div>
      );
    }
    return (
      <Flex
        className="u-margin-x--md"
        align="center"
        key={key}
        index={index}
        style={style}
      >
        <GameRowSkeleton />
      </Flex>
    );
  };

  render() {
    const { areGamesLoaded, error, count } = this.props;

    if (error) {
      return <ErrorMessage errorMessage={error} />;
    }

    if (!areGamesLoaded) {
      return (
        <div className="t-background-chrome-light-2 u-padding-top u-padding-x--md">
          <GameListSkeleton hasTitle={false} />
        </div>
      );
    }

    return (
      <div>
        <div>
          <TrackProvider
            data={{
              [EVENT_PROPS.LOCATION]: "Game Provider - Filtered Games Page",
            }}
          >
            <div className="c-provider-games-list u-padding-top">
              <VirtualList
                scrollElement={this.scrollElement}
                isRowLoaded={this.isRowLoaded}
                rowHeight={ROW_HEIGHT}
                totalNumberOfRows={count}
                loadMoreRows={this.loadMoreRows}
                rowRenderer={this.rowRenderer}
                pageSize={PAGE_SIZE}
              />
            </div>
          </TrackProvider>
        </div>
      </div>
    );
  }
}

export default ProviderGamesList;
