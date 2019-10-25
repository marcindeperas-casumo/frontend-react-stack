// @flow
import * as React from "react";
import List from "@casumo/cmp-list";
import { GameSearchResultsVirtualList } from "Components/GameSearchResultsVirtualList";
import { GameSearchInput } from "Components/GameSearch/GameSearchInput";
import { GameRow } from "Components/GameRow";
import SearchNotFound from "Components/SearchNotFound";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import TrackProvider from "Components/TrackProvider";
import { EVENT_PROPS, EVENT_LOCATIONS } from "Src/constants";
import { PAGE_SIZE } from "Models/gameSearch";
import { GamesVirtualList } from "Components/GamesVirtualList";
import { GamesVirtualListTitle } from "Components/GamesVirtualList/GamesVirtualListTitle";
import { GameSearchSuggestionsList } from "Components/GameSearchSuggestionsList";

import "./GameSearch.scss";

type Props = {
  searchResults: Array<string>,
  searchResultsCount: number,
  loading: boolean,
  inputPromptPlaceholder: string,
  query: string,
  clearSearch: () => {},
  initFetchGameSearchCount: () => {},
  fetchPageBySlug: () => {},
};

export class GameSearch extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.fetchPageBySlug();
  }

  get noResults() {
    return Boolean(
      !this.props.loading &&
        !this.props.searchResultsCount &&
        this.props.query.length
    );
  }

  renderResults = () => {
    const { loading, searchResults, searchResultsCount, query } = this.props;
    const GameRowHighlightSearch = id => (
      <GameRow search={{ query, highlightSearchQuery: true }} id={id} />
    );

    if (loading) {
      return (
        <GameListSkeleton
          className="u-game-search-max-width u-padding-x--md"
          hasTitle={false}
          titleYOffset={20}
        />
      );
    } else if (searchResultsCount) {
      return (
        <TrackProvider
          data={{ [EVENT_PROPS.LOCATION]: EVENT_LOCATIONS.SEARCH_GAMES }}
        >
          {searchResultsCount < PAGE_SIZE ? (
            <List
              className="u-padding-top u-padding-x--md u-game-search-max-width"
              items={searchResults}
              itemSpacing="default"
              render={GameRowHighlightSearch}
            />
          ) : (
            <div className="c-game-search-virtual-list u-game-search-max-width">
              <GameSearchResultsVirtualList
                query={query}
                games={searchResults}
                renderItem={GameRowHighlightSearch}
              />
            </div>
          )}
          {searchResultsCount === 1 && (
            <GameSearchSuggestionsList className="u-game-search-max-width" />
          )}
        </TrackProvider>
      );
    } else if (query.length) {
      return (
        <>
          <div className="t-background-grey-light-2">
            <SearchNotFound className="u-game-search-max-width" />
          </div>
          <GameSearchSuggestionsList className="u-game-search-max-width" />
        </>
      );
    } else {
      return (
        <TrackProvider
          data={{ [EVENT_PROPS.LOCATION]: EVENT_LOCATIONS.ALL_GAMES }}
        >
          <div className="c-game-search-virtual-list u-game-search-max-width">
            <GamesVirtualList
              renderItem={id => <GameRow search={{}} id={id} />}
              renderTitle={title => <GamesVirtualListTitle title={title} />}
            />
          </div>
        </TrackProvider>
      );
    }
  };

  render() {
    return (
      <div className="c-game-search">
        <div className="c-game-search-bar u-position-sticky">
          <div className="t-background-chrome-light-2">
            <GameSearchInput
              className="u-game-search-max-width u-padding--md"
              initFetchGameSearchCount={this.props.initFetchGameSearchCount}
              clearSearch={this.props.clearSearch}
              noResults={this.noResults}
              placeholder={this.props.inputPromptPlaceholder}
            />
          </div>
        </div>
        {this.renderResults()}
      </div>
    );
  }
}
