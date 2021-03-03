// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { SearchNotFoundContainer } from "Components/SearchNotFound";
import { GameSearchInput } from "Components/GameSearch/GameSearchInput";
import { GameRow, GameRowSearchText } from "Components/GameRow";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import TrackProvider from "Components/TrackProvider";
import { EVENT_PROPS, EVENT_LOCATIONS } from "Src/constants";
import { useScrollToTop } from "Utils/hooks";
import * as A from "Types/apollo";
import { xPaddingClasses } from "Components/GameListHorizontal/constants";

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

// const isRowLoaded = ({ index }: { index: number }) => {
//   return Boolean(searchResults[index]);
// };

const GameMaintenanceText = t => {
  return (
    <Text className="u-padding-top--sm t-color-grey-70" size="sm">
      {t.gameInMaintenanceText}
    </Text>
  );
};

const GameStudioText = ({ studioName }) => (
  <div className="t-color-grey-20">{studioName}</div>
);

const gameRowHighlightSearch = (query, game) => (
  <GameRow
    game={game}
    renderText={() => (
      <GameRowSearchText
        name={game.name}
        search={{ query, highlightSearchQuery: true }}
        isInMaintenance={game.isInMaintenance}
        renderSecondaryText={() =>
          game.isInMaintenance ? (
            <GameMaintenanceText />
          ) : (
            <GameStudioText studioName={game.gameStudio} />
          )
        }
      />
    )}
  />
);

const renderGameRow = (games, query, game, index) => {
  if (!Boolean(games[index])) {
    return (
      <Flex
        className="t-border-bottom t-color-grey-0 t-border-current"
        key={index}
        index={index}
      >
        <GameRowSkeleton />
      </Flex>
    );
  }
  return (
    <Flex
      className="t-border-bottom t-color-grey-0 t-background-grey-0:hover t-border-current c-game-list-row"
      key={game.id}
      index={index}
      align="center"
    >
      {gameRowHighlightSearch(query, game)}
    </Flex>
  );
};

const SuggestionSectionTitle = ({ children }) => (
  <Text
    size="md"
    className="u-font-weight-black t-color-grey-50 u-padding-left u-padding-top--xlg u-padding-bottom--md"
  >
    {children}
  </Text>
);

const GameList = ({ query, games, ...rest }) => (
  <>{games.map((game, index) => renderGameRow(games, query, game, index))}</>
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
  inputPromptPlaceholder,
}: Props) => {
  const [listHash, setListHash] = React.useState("");
  const noResults = !loading && searchResultsCount === 0 && query.length > 0;

  useScrollToTop(query);

  React.useEffect(() => {
    if (!loading) {
      setListHash(query);
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderResults = () => (
    <>
      {searchResultsCount !== 0 && (
        <TrackProvider
          data={{
            [EVENT_PROPS.LOCATION]: searchResultsCount
              ? EVENT_LOCATIONS.SEARCH_GAMES
              : EVENT_LOCATIONS.ALL_GAMES,
          }}
        >
          <GameList
            fetchMoreRows={fetchMoreRows}
            games={searchResults}
            rowCount={searchResultsCount}
            query={query}
            listHash={listHash}
          />
        </TrackProvider>
      )}
      {!loadingSuggestions && query.length > 0 && (
        <>
          <SuggestionSectionTitle>{suggestions?.title}</SuggestionSectionTitle>
          <TrackProvider
            data={{
              [EVENT_PROPS.LOCATION]: EVENT_LOCATIONS.SUGGESTED_GAMES,
            }}
          >
            <GameList
              games={suggestions.games}
              rowCount={suggestions.games.length}
              query=""
              listHash={listHash}
            />
          </TrackProvider>
        </>
      )}
    </>
  );

  return (
    <div className={`o-wrapper ${xPaddingClasses}`}>
      <div className="c-game-search t-background-grey-0 c-game-search-bar u-position-sticky--top u-padding-y--md u-padding-y--lg@desktop">
        <GameSearchInput
          onChange={queryChanged}
          clearSearch={clearSearch}
          noResults={noResults}
          placeholder={inputPromptPlaceholder}
        />
      </div>
      <div className="t-border-r--md t-border-r--none@mobile t-background-white">
        {noResults && <SearchNotFoundContainer type={suggestions?.type} />}
        {searchResults.length === 0 && loading ? (
          <GameListSkeleton hasTitle={false} />
        ) : (
          renderResults()
        )}
      </div>
    </div>
  );
};
