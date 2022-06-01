import * as React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import { ObservableQueryFields } from "@apollo/client";
import * as A from "Types/apollo";
import { SearchNotFoundContainer } from "Components/SearchNotFound";
import { GameSearchInput } from "Components/GameSearch/GameSearchInput";
import { GameRow, GameRowSearchText } from "Components/GameRow";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import { xPaddingClasses } from "Components/GameListHorizontal/constants";
import { useScrollToTop } from "Utils/hooks";
import type { TGameSearchSuggestions, TCmsContent } from "./GameSearch.types";
import { GameSearchResults } from "./GameSearchResults";
import { GameSearchSuggestions } from "./GameSearchSuggestions";

import "./GameSearch.scss";

type TProps = {
  query: string;
  searchResults: Array<A.GameSearch_GameFragment>;
  searchResultsCount: number;
  loading: boolean;
  loadingSuggestions: boolean;
  suggestions: TGameSearchSuggestions;
  clearSearch: () => void;
  fetchMoreRows: ObservableQueryFields<
    A.GameSearchQuery,
    A.GameSearchQueryVariables
  >["fetchMore"];
  queryChanged: (query: string) => void;
  t: TCmsContent;
};

const gameRowSecondaryText =
  (game: A.GameSearch_GameFragment, t: TCmsContent) => () => {
    return game.isInMaintenance ? (
      <Text className="u-padding-top--sm text-grey-70" size="sm">
        {t.gameInMaintenanceText}
      </Text>
    ) : (
      <div className="text-grey-20">{game.gameStudio}</div>
    );
  };

const gameRowHighlightSearch = (query: string, t: TCmsContent) => game =>
  (
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

export const GameSearch: React.FC<TProps> = ({
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
}) => {
  const noResults = !loading && searchResultsCount === 0 && query.length > 0;

  useScrollToTop({ triggerScrollProp: query });

  return (
    <div className={cx("o-wrapper", xPaddingClasses)}>
      <div className="c-game-search bg-grey-0 c-game-search-bar o-position--sticky o-inset-top--none u-padding-y--md u-padding-y--lg@desktop">
        <GameSearchInput
          onChange={queryChanged}
          clearSearch={clearSearch}
          noResults={noResults}
          placeholder={t.searchSuggestionText}
        />
      </div>
      <div className="t-border-r--md t-border-r--none@mobile bg-white">
        {noResults && <SearchNotFoundContainer type={suggestions?.type} />}
        {searchResults.length === 0 && loading ? (
          <GameListSkeleton hasTitle={false} />
        ) : (
          <>
            <GameSearchResults
              resultsCount={searchResultsCount}
              results={searchResults}
              renderItem={gameRowHighlightSearch(query, t)}
            />
            ){query.length > 0 && <GameSearchSuggestions {...suggestions} />}
          </>
        )}
      </div>
    </div>
  );
};
