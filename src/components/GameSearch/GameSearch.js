// @flow
import * as React from "react";
import List from "@casumo/cmp-list";
import { GameSearchResultsVirtualList } from "Components/GameSearchResultsVirtualList/GameSearchResultsVirtualList";
import { GameSearchInput } from "Components/GameSearch/GameSearchInput";
import { GameRow } from "Components/GameRow/GameRow";
import SearchNotFound from "Components/SearchNotFound";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import TrackProvider from "Components/TrackProvider";
import {
  EVENT_PROPS,
  EVENT_LOCATIONS,
  ROOT_SCROLL_ELEMENT_ID,
} from "Src/constants";
import { PAGE_SIZE } from "Models/gameSearch";
import { GamesVirtualList } from "Components/GamesVirtualList/GamesVirtualList";
import { GamesVirtualListTitle } from "Components/GamesVirtualList/GamesVirtualListTitle";
import { GameSearchSuggestionsList } from "Components/GameSearchSuggestionsList";

import "./GameSearch.scss";

type Props = {
  query: string,
  searchResults: Array<{}>,
  searchResultsCount: number,
  loading: boolean,
  inputPromptPlaceholder: string,
  clearSearch: () => {},
  fetchMoreRows: (query: string) => {},
  queryChanged: (query: string) => {},
};

export class GameSearch extends React.PureComponent<Props> {
  get noResults() {
    return Boolean(
      !this.props.loading &&
        !this.props.searchResultsCount &&
        this.props.query.length
    );
  }

  componentDidUpdate = prevProps => {
    // when we change query we scroll to the top
    if (prevProps.query !== this.props.query) {
      const scrollElement = document.getElementById(ROOT_SCROLL_ELEMENT_ID);

      if (scrollElement && scrollElement.scrollTop) {
        // eslint-disable-next-line fp/no-mutation
        scrollElement.scrollTop = 0;
      }
    }
  };

  renderResults = () => {
    const {
      loading,
      searchResults,
      searchResultsCount,
      fetchMoreRows,
      query,
    } = this.props;

    const GameRowHighlightSearch = game => (
      <GameRow search={{ query, highlightSearchQuery: true }} game={game} />
    );

    if (!query.length) {
      return (
        <TrackProvider
          data={{ [EVENT_PROPS.LOCATION]: EVENT_LOCATIONS.ALL_GAMES }}
        >
          <div className="c-game-search-virtual-list">
            <GamesVirtualList // GamesVirtualList
              renderItem={GameRowHighlightSearch}
              renderTitle={title => <GamesVirtualListTitle title={title} />}
              fetchMoreRows={fetchMoreRows}
              games={searchResults}
              rowCount={searchResultsCount}
            />
          </div>
        </TrackProvider>
      );
    }

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
              <GamesVirtualList
                rowCount={searchResultsCount}
                query={query}
                games={searchResults}
                renderItem={GameRowHighlightSearch}
                fetchMoreRows={fetchMoreRows}
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
      return null;
    }
  };

  render() {
    return (
      <div className="c-game-search">
        <div className="c-game-search-bar u-position-sticky--top">
          <div className="t-background-chrome-light-2">
            <GameSearchInput
              className="u-game-search-max-width u-padding--md"
              onChange={this.props.queryChanged}
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
