// @flow
import * as React from "react";
import GameSearchInput from "Components/GameSearch/GameSearchInput";
import GameRowSearch from "Components/GameRowSearch";
import SearchNotFound from "Components/SearchNotFound";
import GameListSkeleton from "Components/GameListSkeleton/GameListSkeleton";
import List from "@casumo/cmp-list";
import GamesVirtualList from "Components/GamesVirtualList";
import GameSearchSuggestionsList from "Components/GameSearchSuggestionsList";

import "./GameSearch.scss";

type Props = {
  searchResults: Array<string>,
  loading: boolean,
  inputPromptPlaceholder: string,
  query: string,
  initFetchQuerySearch: () => {},
  clearSearch: () => {},
  preloadFetchPlayerGames: () => {},
  fetchPageBySlug: () => {},
};

export default class GameSearch extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.fetchPageBySlug();
  }

  get noMatch() {
    return Boolean(
      !this.props.loading &&
        !this.props.searchResults.length &&
        this.props.query
    );
  }

  renderListSkeleton = (hasTitle: boolean = true) => (
    <GameListSkeleton
      className="u-padding-horiz--md"
      hasTitle={hasTitle}
      titleYOffset={20}
    />
  );

  renderNoMatch = () => {
    return (
      <>
        <SearchNotFound contentField={"no_results_continue_playing"} />
        <GameSearchSuggestionsList />
      </>
    );
  };

  renderResults = () => {
    const { loading, searchResults, query } = this.props;

    if (!loading && !this.noMatch) {
      return (
        <div className="c-game-search-virtual-list">
          <GamesVirtualList renderItem={id => <GameRowSearch slug={id} />} />
        </div>
      );
    }

    if (loading) {
      return this.renderListSkeleton(false);
    }

    if (this.noMatch) {
      return this.renderNoMatch();
    }

    return (
      <>
        <List
          className="u-padding-top u-padding-horiz--md"
          items={searchResults}
          itemSpacing="default"
          render={id => (
            <GameRowSearch query={query} highlightSearchQuery slug={id} />
          )}
        />
        {searchResults.length === 1 && <GameSearchSuggestionsList />}
      </>
    );
  };

  render() {
    return (
      <>
        <div className="u-padding--md u-position-sticky c-game-search-bar">
          <GameSearchInput
            initFetchQuerySearch={this.props.initFetchQuerySearch}
            clearSearch={this.props.clearSearch}
            noResults={this.noMatch}
            placeholder={this.props.inputPromptPlaceholder}
          />
          <div className="o-bleed t-background-grey-light-2 c-game-search-input-bg" />
        </div>
        {this.renderResults()}
      </>
    );
  }
}
