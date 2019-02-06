// @flow
import React, { PureComponent } from "react";

import Flex from "@casumo/cmp-flex";
import SearchInput from "Components/SearchInput";
import SectionList from "Components/SectionList";
import GameRowSearch from "Components/GameRowSearch";
import SearchNotFound from "Components/SearchNotFound";
import ListSkeleton from "Components/ListSkeleton/ListSkeleton";
import List from "@casumo/cmp-list";
import { debounce } from "lodash";
import GamesVirtualList from "Components/GamesVirtualList";

type Props = {
  playerGames: Array<string>,
  fetchPlayerGamesPage: Function,
  isPlayerGamesLoaded: boolean,
  preloadFetchPlayerGames: Function,
  fetchSearch: Function,
  clearSearch: Function,
  dispatchLaunchGame: Function,
  searchResults: Array<string>,
  latestPlayedGames: Array<string>,
  popularGames: Array<string>,
  hasNoLatestPlayed: boolean,
  loading: boolean,
  hasNoResults: boolean,
  startFetchCmsPage: () => void,
  popularGamesTitle: string,
  latestPlayedGamesTitle: string,
  inputPromptPlaceholder: string,
};

type State = {
  query: string,
};

export default class GameSearch extends PureComponent<Props, State> {
  state = {
    query: "",
  };

  constructor(props: Props) {
    super(props);
    // eslint-disable-next-line fp/no-mutation
    this.fetchSearchResults = debounce(this.fetchSearchResults, 1000);
  }

  componentDidMount() {
    const { startFetchCmsPage } = this.props;

    startFetchCmsPage();
  }

  fetchSearchResults = () => {
    const { fetchSearch } = this.props;
    const { query } = this.state;

    return fetchSearch(query);
  };

  handleSearchInput = (event: Event) => {
    if (event.currentTarget instanceof HTMLInputElement) {
      this.setState(
        {
          query: event.currentTarget.value,
        },
        e => this.fetchSearchResults()
      );
    }
  };

  handleClearSearchInput = () => {
    const { clearSearch } = this.props;

    this.setState({ query: "" });
    clearSearch();
  };

  handleFocusSearchInput = () => {};

  renderListSkeleton = (title: boolean = true) => (
    <ListSkeleton title={title} titleYOffset="20" />
  );

  renderPopularGames = () => {
    const { popularGames, popularGamesTitle } = this.props;

    if (!popularGames.length) {
      return this.renderListSkeleton();
    } else {
      return (
        <SectionList
          sections={[{ title: popularGamesTitle, data: popularGames }]}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={id => <GameRowSearch slug={id} />}
        />
      );
    }
  };

  renderLatestPlayed = () => {
    const { latestPlayedGames, latestPlayedGamesTitle } = this.props;

    if (!latestPlayedGames.length) {
      return this.renderListSkeleton();
    } else {
      return (
        <SectionList
          sections={[
            { title: latestPlayedGamesTitle, data: latestPlayedGames },
          ]}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={id => <GameRowSearch slug={id} />}
        />
      );
    }
  };

  renderSuggestions = () => {
    const { hasNoLatestPlayed } = this.props;

    return hasNoLatestPlayed
      ? this.renderPopularGames()
      : this.renderLatestPlayed();
  };

  renderSectionHeader = (title: string) => (
    <p className="u-font-weight-bold u-font-md u-padding-top--lg u-padding-bottom--sm">
      {title}
    </p>
  );

  renderNoMatch = () => {
    const { hasNoLatestPlayed } = this.props;
    const field = hasNoLatestPlayed
      ? "no_results_popular"
      : "no_results_continue_playing";

    return (
      <React.Fragment>
        <SearchNotFound contentField={field} />
        <div className="u-padding-horiz--md">{this.renderSuggestions()}</div>
      </React.Fragment>
    );
  };

  renderResults = () => {
    const {
      playerGames,
      preloadFetchPlayerGames,
      loading,
      hasNoResults,
      searchResults,
    } = this.props;
    const { query } = this.state;

    if (loading) {
      return (
        <div className="u-padding-horiz--md u-padding-top--md">
          {this.renderListSkeleton(false)}
        </div>
      );
    }

    if (hasNoResults) {
      return this.renderNoMatch();
    }

    if (!searchResults.length) {
      return (
        <GamesVirtualList
          games={playerGames}
          remoteRowsCount={1200}
          renderItem={id => <GameRowSearch slug={id} />}
          fetchNextPage={preloadFetchPlayerGames}
        />
      );
    }

    return (
      <div className="u-padding-horiz--md">
        {/* <GamesVirtualList /> */}
        <List
          items={searchResults}
          itemSpacing="default"
          render={id => (
            <GameRowSearch query={query} highlightSearchQuery slug={id} />
          )}
        />
        {searchResults.length === 1 && this.renderSuggestions()}
      </div>
    );
  };

  render() {
    const { hasNoResults, inputPromptPlaceholder } = this.props;

    return (
      <Flex direction="vertical" spacing="none">
        <div className="t-background-grey-light-2 u-padding--md u-position-sticky">
          <SearchInput
            autoFocus={true}
            value={this.state.query}
            onChange={this.handleSearchInput}
            onClear={this.handleClearSearchInput}
            hasNoResults={hasNoResults}
            onFocus={this.handleFocusSearchInput}
            placeholder={inputPromptPlaceholder}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "72px",
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {this.renderResults()}
        </div>
      </Flex>
    );
  }
}
