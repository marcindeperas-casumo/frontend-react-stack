// @flow
import * as React from "react";
import List from "@casumo/cmp-list";
import { SearchNotFoundWithGameSuggestions } from "Components/SearchNotFoundWithGameSuggestions";
import { GameSearchInput } from "Components/GameSearch/GameSearchInput";
import { GameRow } from "Components/GameRow/GameRow";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import TrackProvider from "Components/TrackProvider";
import {
  EVENT_PROPS,
  EVENT_LOCATIONS,
  ROOT_SCROLL_ELEMENT_ID,
} from "Src/constants";
import * as A from "Types/apollo";
import { PAGE_SIZE } from "Models/gameSearch";
import { GamesVirtualList } from "Components/GamesVirtualList/GamesVirtualList";
import { GamesVirtualListTitle } from "Components/GamesVirtualList/GamesVirtualListTitle";
import { GameSearchSuggestionsList } from "Components/GameSearchSuggestionsList";

import "./GameSearch.scss";

type Props = {
  query: string,
  searchResults: Array<A.GameSearch_Game>,
  searchResultsCount: number,
  loading: boolean,
  inputPromptPlaceholder: string,
  clearSearch: () => {},
  fetchMoreRows: Function => Promise<any>,
  queryChanged: (query: string) => {},
};

const GameRowHighlightSearch = (game, query) => (
  <GameRow search={{ query, highlightSearchQuery: true }} game={game} />
);

export const GameSearch = (props: Props) => {
  const noResults = Boolean(
    !props.loading && !props.searchResultsCount && props.query.length
  );
  const {
    loading,
    searchResults,
    searchResultsCount,
    fetchMoreRows,
    query,
    queryChanged,
    clearSearch,
    inputPromptPlaceholder,
  } = props;

  const renderResults = () => {
    if (!query.length) {
      return (
        <TrackProvider
          data={{ [EVENT_PROPS.LOCATION]: EVENT_LOCATIONS.ALL_GAMES }}
        >
          <div className="c-game-search-virtual-list">
            <GamesVirtualList
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
            <GameSearchSuggestionsList searchResults={searchResults} />
          )}
        </TrackProvider>
      );
    } else if (query.length) {
      return <SearchNotFoundWithGameSuggestions />;
    }
  };

  React.useEffect(() => {
    const scrollElement = document.getElementById(ROOT_SCROLL_ELEMENT_ID);

    if (scrollElement && scrollElement.scrollTop) {
      // eslint-disable-next-line fp/no-mutation
      scrollElement.scrollTop = 0;
    }
  }, [props.query]);

  return (
    <div className="c-game-search">
      <div className="c-game-search-bar u-position-sticky--top">
        <div className="t-background-chrome-light-2">
          <GameSearchInput
            className="u-game-search-max-width u-padding--md"
            onChange={queryChanged}
            clearSearch={clearSearch}
            noResults={noResults}
            placeholder={inputPromptPlaceholder}
          />
        </div>
      </div>
      {renderResults()}
    </div>
  );
};
