// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import { isMobile } from "Components/ResponsiveLayout";
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
  inputPromptPlaceholder: string,
  clearSearch: () => {},
  fetchMoreRows: Function => Promise<any>,
  queryChanged: (query: string) => {},
};

const GameMaintenanceText = () => {
  const { t } = useTranslationsGql({
    gameInMaintenanceText:
      "root:mobile.game-details:fields.temporarily_unavailable",
  });

  return (
    <Text className="u-padding-top--sm t-color-grey-70" size="sm">
      {t.gameInMaintenanceText}
    </Text>
  );
};
const gameRowHighlightSearch = query => game => (
  <GameRow
    big={!isMobile()}
    game={game}
    renderText={() => (
      <GameRowSearchText
        name={game.name}
        search={{ query, highlightSearchQuery: true }}
        isInMaintenance={game.isInMaintenance}
        renderSecondaryText={() =>
          game.isInMaintenance && <GameMaintenanceText />
        }
      />
    )}
  />
);
const SectionTitle = props => (
  <Text
    size="md"
    className="u-font-weight-black t-color-grey-50 u-padding-left u-padding-top--xlg u-padding-bottom--md"
  >
    {props.children}
  </Text>
);
const RenderResults = ({ query, ...rest }) => (
  <GamesVirtualList
    renderItem={gameRowHighlightSearch(query)}
    renderTitle={title => <GamesVirtualListTitle title={title} />}
    query={query}
    big={!isMobile()}
    {...rest}
  />
);

export const GameSearch = (props: Props) => {
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
              games={suggestions.games}
              rowCount={suggestions.games.length}
              query=""
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
    <div className="c-game-search o-wrapper t-background-white u-margin-top--xlg@desktop">
      <div
        className={classNames(
          "c-game-search-bar u-position-sticky--top u-padding--lg@desktop t-border-bottom",
          isMobile() ? "t-background-grey-0" : "t-background-white"
        )}
      >
        <GameSearchInput
          onChange={queryChanged}
          clearSearch={clearSearch}
          noResults={noResults}
          placeholder={inputPromptPlaceholder}
          {...(!isMobile()
            ? { colorBackgroundClass: "t-background-grey-0" }
            : {})}
        />
      </div>
      <div className="u-padding-x--xlg@desktop">
        {noResults && <SearchNotFoundContainer type={suggestions?.type} />}
        {loading ? (
          <GameListSkeleton hasTitle={false} big={!isMobile()} />
        ) : (
          renderResults()
        )}
      </div>
    </div>
  );
};
