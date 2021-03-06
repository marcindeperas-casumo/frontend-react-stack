import Text from "@casumo/cmp-text";
import * as React from "react";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SearchNotFoundContainer } from "Components/SearchNotFound";
import { GameSearchInput } from "Components/GameSearch/GameSearchInput";
import { GameRow, GameRowSearchText } from "Components/GameRow";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import TrackProvider from "Components/TrackProvider";
import {
  EVENT_PROPS,
  EVENT_LOCATIONS,
  ROOT_SCROLL_ELEMENT_ID,
} from "Src/constants";
import * as A from "Types/apollo";
import {
  GamesVirtualList,
  GamesVirtualListTitle,
} from "Components/GamesVirtualList";
import { xPaddingClasses } from "Components/GameListHorizontal/constants";
import { useGoogleTagManager } from "Components/GoogleTagManager";

import "./GameSearch.scss";

type Props = {
  query: string;
  searchResults: Array<A.GameSearch_GameFragment>;
  searchResultsCount: number;
  loading: boolean;
  loadingSuggestions: boolean;
  suggestions: {
    games: A.GameSearchSuggestionsListContainerQuery["gamesList"]["games"];
    location: string;
    title: string | undefined;
    type: string;
  };
  inputPromptPlaceholder: string;
  clearSearch: () => void;
  fetchMoreRows: ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number;
    stopIndex: number;
  }) => Promise<any>;
  queryChanged: (query: string) => void;
};

const GameMaintenanceText = () => {
  const { t } = useTranslationsGql({
    gameInMaintenanceText:
      "root:mobile.game-details:fields.temporarily_unavailable",
  });

  return (
    <Text className="u-padding-top--sm text-grey-70" size="sm">
      {t.gameInMaintenanceText}
    </Text>
  );
};

const GameStudioText = ({ studioName }) => (
  <div className="text-grey-20">{studioName}</div>
);

const gameRowHighlightSearch = query => game =>
  (
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
const SectionTitle = props => (
  <Text
    size="md"
    className="u-font-weight-black text-grey-50 u-padding-left u-padding-top--xlg u-padding-bottom--md"
  >
    {props.children}
  </Text>
);
const RenderResults = ({ query, ...rest }) => (
  <GamesVirtualList
    pageSize={24}
    renderItem={gameRowHighlightSearch(query)}
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ renderItem: (game: any) => Element; render... Remove this comment to see the full error message
    renderTitle={title => <GamesVirtualListTitle title={title} />}
    hasRoundedBorder={false}
    {...rest}
  />
);

export const GameSearch = (props: Props) => {
  const [listHash, setListHash] = React.useState("");
  const {
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
  } = props;
  const noResults = !loading && searchResultsCount === 0 && query.length > 0;
  const gtm = useGoogleTagManager();

  React.useEffect(() => {
    if (!loading && query.length > 0) {
      gtm.trackEvent({
        event: "search",
        payload: {
          search_string: query,
        },
      });
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <RenderResults
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
          <SectionTitle>{suggestions?.title}</SectionTitle>
          <TrackProvider
            data={{
              [EVENT_PROPS.LOCATION]: EVENT_LOCATIONS.SUGGESTED_GAMES,
            }}
          >
            <RenderResults
              fetchMoreRows={fetchMoreRows}
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

  React.useEffect(() => {
    const scrollElement = document.getElementById(ROOT_SCROLL_ELEMENT_ID);

    if (scrollElement && scrollElement.scrollTop) {
      // eslint-disable-next-line fp/no-mutation
      scrollElement.scrollTop = 0;
    }
  }, [props.query]);

  return (
    <div className={`o-wrapper ${xPaddingClasses}`}>
      <div className="c-game-search bg-grey-0 top-none z-modal sticky py-md desktop:py-lg">
        <GameSearchInput
          onChange={queryChanged}
          clearSearch={clearSearch}
          noResults={noResults}
          placeholder={inputPromptPlaceholder}
        />
      </div>
      <div className="t-border-r--md t-border-r--none@mobile bg-white">
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
