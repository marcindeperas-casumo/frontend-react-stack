// @flow
import * as React from "react";
import List from "@casumo/cmp-list";
import GameSearchInput from "Components/GameSearch/GameSearchInput";
import GameRowSearch from "Components/GameRowSearch";
import SearchInputSkeleton from "Components/SearchInput/SearchInputSkeleton";
import SearchNotFound from "Components/SearchNotFound";
import GameListSkeleton from "Components/GameListSkeleton/GameListSkeleton";
import TrackProvider from "Components/TrackProvider";
import { EVENT_PROPS, EVENT_LOCATIONS } from "Src/constants";
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

  get noResults() {
    return Boolean(
      !this.props.loading &&
        !this.props.searchResults.length &&
        this.props.query.length
    );
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
    } else if (searchResults.length) {
      return (
        <TrackProvider
          data={{ [EVENT_PROPS.LOCATION]: EVENT_LOCATIONS.SEARCH_GAMES }}
        >
          <List
            className="u-padding-top u-padding-horiz--md"
            items={searchResults}
            itemSpacing="default"
            render={id => (
              <GameRowSearch query={query} highlightSearchQuery slug={id} />
            )}
          />
          {searchResults.length === 1 && <GameSearchSuggestionsList />}
        </TrackProvider>
      );
    } else if (query.length) {
      return (
        <>
          <SearchNotFound />
          <GameSearchSuggestionsList />
        </>
      );
    } else {
      return (
        <TrackProvider
          data={{ [EVENT_PROPS.LOCATION]: EVENT_LOCATIONS.ALL_GAMES }}
        >
          <div className="c-game-search-virtual-list">
            <GamesVirtualList renderItem={id => <GameRowSearch slug={id} />} />
          </div>
        </TrackProvider>
      );
    }
  };

  render() {
    return (
      <>
        <div className="u-position-sticky c-game-search-bar">
          <div className="o-bleed t-background-grey-light-2">
            <GameSearchInput
              initFetchQuerySearch={this.props.initFetchQuerySearch}
              clearSearch={this.props.clearSearch}
              noResults={this.noResults}
              placeholder={this.props.inputPromptPlaceholder}
            />
          </div>
        </div>
        {this.renderResults()}
      </>
    );
  }
}
