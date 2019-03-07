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

  renderResults = () => {
    const { loading, searchResults, query } = this.props;

    if (loading) {
      return (
        <GameListSkeleton
          className="u-padding-horiz--md"
          hasTitle={false}
          titleYOffset={20}
        />
      );
    } else if (this.props.searchResults.length) {
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
    } else if (this.props.query.length) {
      return (
        <>
          <SearchNotFound contentField={"no_results_continue_playing"} />
          <GameSearchSuggestionsList />
        </>
      );
    } else {
      return (
        <div className="c-game-search-virtual-list">
          <GamesVirtualList renderItem={id => <GameRowSearch slug={id} />} />
        </div>
      );
    }
  };

  render() {
    const noResults = Boolean(
      !this.props.loading &&
        !this.props.searchResults.length &&
        this.props.query.length
    );
    return (
      <>
        <div className="u-padding--md u-position-sticky c-game-search-bar">
          <GameSearchInput
            initFetchQuerySearch={this.props.initFetchQuerySearch}
            clearSearch={this.props.clearSearch}
            noResults={noResults}
            placeholder={this.props.inputPromptPlaceholder}
          />
          <div className="o-bleed t-background-grey-light-2 c-game-search-input-bg" />
        </div>
        {this.renderResults()}
      </>
    );
  }
}
