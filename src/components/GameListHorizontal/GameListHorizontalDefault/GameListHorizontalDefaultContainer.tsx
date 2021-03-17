import { useQuery } from "@apollo/client";
import React from "react";
import {
  EVENT_PROPS,
  GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
  POLL_INTERVAL,
} from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import * as A from "Types/apollo";
import { GameListHorizontalSkeleton } from "../GameListHorizontalSkeleton";
import { GameListHorizontalDefault } from "./GameListHorizontalDefault";
import { GameListQuery } from "./GameListHorizontalDefault.graphql";

type Props = {
  /** The game list id */
  id: string;
  /** The number of games to show */
  numberOfGames: number;
};

export const GameListHorizontalDefaultContainer = React.memo<Props>(
  ({ id, numberOfGames = GAMES_LIST_HORIZONTAL_ITEMS_LIMIT }: Props) => {
    const { data, loading } = useQuery<
      A.GameListQuery,
      A.GameListQueryVariables
    >(GameListQuery, {
      pollInterval: POLL_INTERVAL.GAMES_LIST,
      variables: { id, numberOfGames },
    });

    if (data && data.gamesList && data.gamesList.games.length) {
      return (
        <TrackProvider data={{ [EVENT_PROPS.LOCATION]: id }}>
          <GameListHorizontalDefault list={data.gamesList} />
        </TrackProvider>
      );
    }

    if (loading) {
      return (
        <div className="o-wrapper">
          <GameListHorizontalSkeleton key={`game-list-skeleton-${id}`} />
        </div>
      );
    }

    return null;
  }
);
