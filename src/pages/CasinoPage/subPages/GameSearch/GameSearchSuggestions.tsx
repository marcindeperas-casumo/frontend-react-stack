import * as React from "react";
import Text from "@casumo/cmp-text";
import TrackProvider from "Components/TrackProvider";
import { EVENT_LOCATIONS, EVENT_PROPS } from "Src/constants";
import * as A from "Types/apollo";
import { GameList } from "./GameList";

export type TProps = {
  games: Array<A.GameSearchSuggestionsListContainerQuery_gamesList_games>;
  location: string;
  title: string;
  type: string;
};

export const GameSearchSuggestions = ({ games, title }: TProps) => (
  <>
    <Text
      size="md"
      className="u-font-weight-black t-color-grey-50 u-padding-left u-padding-top--xlg u-padding-bottom--md"
    >
      {title}
    </Text>
    <TrackProvider
      data={{
        [EVENT_PROPS.LOCATION]: EVENT_LOCATIONS.SUGGESTED_GAMES,
      }}
    >
      <GameList games={games} />
    </TrackProvider>
  </>
);
