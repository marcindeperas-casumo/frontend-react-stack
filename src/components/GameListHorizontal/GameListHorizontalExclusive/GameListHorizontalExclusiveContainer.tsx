// @flow
import React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { EVENT_PROPS, GAMES_LIST_HORIZONTAL_ITEMS_LIMIT } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import { GameListHorizontalSkeleton } from "../GameListHorizontalSkeleton";
import { GameListHorizontalExclusive } from "./GameListHorizontalExclusive";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './GameListHorizontalExclusive.... Remove this comment to see the full error message
import { GameListExclusiveQuery } from "./GameListHorizontalExclusive.graphql";

type Props = {
  /** The id of the game list. */
  id: string,
  /** The number of games to show */
  numberOfGames: number,
};

export const GameListHorizontalExclusiveContainer = React.memo<Props>(
  ({ id, numberOfGames = GAMES_LIST_HORIZONTAL_ITEMS_LIMIT }: Props) => {
    const { data, loading } = useQuery<
      A.GameListExclusiveQuery,
      A.GameListExclusiveQueryVariables
    >(GameListExclusiveQuery, { variables: { id, numberOfGames } });

    if (loading) {
      return (
        <div className="o-wrapper">
          <GameListHorizontalSkeleton key={`game-list-skeleton-${id}`} />
        </div>
      );
    }
    if (data && data.gamesList && data.gamesList.games.length) {
      return (
        <TrackProvider data={{ [EVENT_PROPS.LOCATION]: id }}>
          <GameListHorizontalExclusive list={data.gamesList} />
        </TrackProvider>
      );
    }

    return null;
  }
);
