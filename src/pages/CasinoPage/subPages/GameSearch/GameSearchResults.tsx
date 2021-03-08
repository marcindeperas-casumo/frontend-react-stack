import * as React from "react";
import TrackProvider from "Components/TrackProvider";
import { EVENT_LOCATIONS, EVENT_PROPS } from "Src/constants";
import { GameList } from "./GameList";
import type { TGameSearchResults as TProps } from "./GameSearch.types";

export const GameSearchResults = ({
  results,
  resultsCount,
  renderItem,
}: TProps) => (
  <>
    {resultsCount > 0 && (
      <TrackProvider
        data={{
          [EVENT_PROPS.LOCATION]: resultsCount
            ? EVENT_LOCATIONS.SEARCH_GAMES
            : EVENT_LOCATIONS.ALL_GAMES,
        }}
      >
        <GameList games={results} renderItem={renderItem} />
      </TrackProvider>
    )}
  </>
);
