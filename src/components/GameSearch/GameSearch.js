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
import { getAlphabeticalSections } from "Components/SectionList/utils";

type Props = {
  playerGames: Array<string>,
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
    const { isPlayerGamesLoaded, preloadFetchPlayerGames } = this.props;
    if (!isPlayerGamesLoaded) preloadFetchPlayerGames();
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
    const { popularGames } = this.props;

    if (!popularGames.length) {
      return this.renderListSkeleton();
    } else {
      return (
        <SectionList
          sections={[{ title: "Popular Games", data: popularGames }]}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={id => <GameRowSearch slug={id} />}
        />
      );
    }
  };

  renderLatestPlayed = () => {
    const { latestPlayedGames } = this.props;

    if (!latestPlayedGames.length) {
      return this.renderListSkeleton();
    } else {
      return (
        <SectionList
          sections={[{ title: "Continue Playing", data: latestPlayedGames }]}
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
    const { playerGames, loading, hasNoResults, searchResults } = this.props;
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
      const sections = getAlphabeticalSections(playerGames);

      return (
        <div className="u-padding-horiz--md">
          <SectionList
            sections={sections}
            renderSectionHeader={this.renderSectionHeader}
            renderItem={id => <GameRowSearch slug={id} />}
          />
        </div>
      );
    }

    return (
      <div className="u-padding-horiz--md">
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
    const { hasNoResults } = this.props;

    return (
      <Flex direction="vertical" spacing="none">
        <Flex.Block>
          <Flex align="stretch">
            <Flex.Block>
              <div className="t-background-grey-light-2 u-padding--md u-position-sticky">
                <SearchInput
                  autoFocus={true}
                  value={this.state.query}
                  onChange={this.handleSearchInput}
                  onClear={this.handleClearSearchInput}
                  hasNoResults={hasNoResults}
                  onFocus={this.handleFocusSearchInput}
                  placeholder="Eg. game title, provider"
                />
              </div>
              {this.renderResults()}
            </Flex.Block>
          </Flex>
        </Flex.Block>
      </Flex>
    );
  }
}
