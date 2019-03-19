// @flow
import React, { PureComponent } from "react";
import { nth, inc } from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import GameListSkeleton from "Components/GameListSkeleton/GameListSkeleton";
import GameRow from "Components/GameRow";
import ErrorMessage from "Components/ErrorMessage";
import { EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import VirtualList from "Components/VirtualList";
import GameRowSkeleton from "Components/GameRowSkeleton";

type ProviderObject = {
  inMaintenance: boolean,
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
};

const PAGE_SIZE = 50;
const ROW_HEIGHT = 80;

class ProviderGamesList extends PureComponent<Props, State> {
  static defaultProps = {
    fetchGames: () => {},
    areGamesLoaded: false,
    provider: {},
    count: 0,
  };

  state = {
    currentPage: 0,
  };

  componentDidMount() {
    this.props.fetchGames(this.state.currentPage, PAGE_SIZE);
  }

  isRowLoaded = ({ index }: { index: number }) => {
    const { games } = this.props.provider;
    return Boolean(nth(index, games));
  };

  componentDidUpdate(_: any, prevState: { currentPage: number }) {
    if (this.state.currentPage !== prevState.currentPage) {
      this.props.fetchGames(this.state.currentPage, PAGE_SIZE);
    }
  }

  loadMoreRows = ({ startIndex }: { startIndex: number }) => {
    if (!this.isRowLoaded({ index: startIndex })) {
      this.setState(({ currentPage }) => {
        return { currentPage: inc(currentPage) };
      });
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
        <div key={key} className="t-border-bottom" index={index} style={style}>
          <GameRow id={nth(index, games)} />
        </div>
      );
    }
    return (
      <Flex
        className="u-padding-horiz--md t-border-bottom"
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
    const { areGamesLoaded, provider, error, count } = this.props;

    if (provider.inMaintenance) {
      return <ErrorMessage errorMessage={"Provider in maintenance"} />;
    }

    if (error) {
      return <ErrorMessage errorMessage={error} />;
    }

    if (!areGamesLoaded) {
      return <GameListSkeleton />;
    }

    return (
      <div>
        <Text
          align="center"
          size="md"
          className="u-padding--lg t-background-grey-light-2"
          data-test="provider-games-list-title"
        >
          {provider.name}
        </Text>
        <div className="u-padding-horiz--md u-padding-bottom--md">
          <TrackProvider
            data={{
              [EVENT_PROPS.LOCATION]: "Game Provider - Filtered Games Page",
            }}
          >
            <div className="u-height--screen">
              <VirtualList
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
