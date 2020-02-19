// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { EVENT_PROPS, GAMES_LIST_HORIZONTAL_ITEMS_LIMIT } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import * as A from "Types/apollo";
import { GameListHorizontalSkeleton } from "../GameListHorizontalSkeleton";
import { GameListHorizontalDefault } from "./GameListHorizontalDefault";
import { GameListQuery } from "./GameListHorizontalDefault.graphql";

type Props = {
  /** The game list id */
  id: string,
  /** The number of games to show */
  number: number,
};

export const GameListHorizontalDefaultContainer = ({
  id,
  number = GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
}: Props) => {
  const { data, loading } = useQuery<A.GameListQuery, A.GameListQueryVariables>(
    GameListQuery,
    { variables: { id, number } }
  );

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
        <GameListHorizontalDefault list={data.gamesList} />
      </TrackProvider>
    );
  }

  return null;
};
