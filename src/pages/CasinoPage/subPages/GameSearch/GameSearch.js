// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import * as A from "Types/apollo";
import { SearchNotFoundContainer } from "Components/SearchNotFound";
import { GameSearchInput } from "Components/GameSearch/GameSearchInput";
import { GameRow, GameRowSearchText } from "Components/GameRow";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import { xPaddingClasses } from "Components/GameListHorizontal/constants";
import { useScrollToTop } from "Utils/hooks";
import { GameSearchResults } from "./GameSearchResults";
import { GameSearchSuggestions } from "./GameSearchSuggestions";

import "./GameSearch.scss";

type Props = {
  query: string,
  searchResults: Array<A.GameSearch_Game>,
  searchResultsCount: number,
  loading: boolean,
  loadingSuggestions: boolean,
  suggestions: {
    games: Array<A.GameSearchSuggestionsListContainerQuery_gamesList_games>,
    location: string,
    title: ?string,
    type: string,
  },
  clearSearch: () => {},
  fetchMoreRows: Function => Promise<any>,
  queryChanged: (query: string) => {},
  t: {
    inputPromptPlaceholder: string,
    gameInMaintenanceText: string,
  },
};

const gameRowSecondaryText = (game, t) => {
  return game.isInMaintenance ? (
    <Text className="u-padding-top--sm t-color-grey-70" size="sm">
      {t.gameInMaintenanceText}
    </Text>
  ) : (
    <div className="t-color-grey-20">{game.studioName}</div>
  );
};

const gameRowHighlightSearch = (query, t) => game => (
  <GameRow
    game={game}
    renderText={() => (
      <GameRowSearchText
        name={game.name}
        search={{ query, highlightSearchQuery: true }}
        isInMaintenance={game.isInMaintenance}
        renderSecondaryText={gameRowSecondaryText(game, t)}
      />
    )}
  />
);

export const GameSearch = ({
  loading,
  loadingSuggestions,
  suggestions,
  searchResults,
  searchResultsCount,
  fetchMoreRows,
  query,
  queryChanged,
  clearSearch,
  t,
}: Props) => {
  const noResults = !loading && searchResultsCount === 0 && query.length > 0;

  useScrollToTop(query);

  return (
    <div className={`o-wrapper ${xPaddingClasses}`}>
      <div className="c-game-search t-background-grey-0 c-game-search-bar u-position-sticky--top u-padding-y--md u-padding-y--lg@desktop">
        <GameSearchInput
          onChange={queryChanged}
          clearSearch={clearSearch}
          noResults={noResults}
          placeholder={t.inputPromptPlaceholder}
        />
      </div>
      <div className="t-border-r--md t-border-r--none@mobile t-background-white">
        {noResults && <SearchNotFoundContainer type={suggestions?.type} />}
        {searchResults.length === 0 && loading ? (
          <GameListSkeleton hasTitle={false} />
        ) : (
          <>
            {
              <GameSearchResults
                searchResults={searchResults}
                searchResultsCount={searchResultsCount}
                renderItem={gameRowHighlightSearch(query, t)}
              />
            }
            {query.length > 0 && <GameSearchSuggestions {...suggestions} />}
          </>
        )}
      </div>
    </div>
  );
};
