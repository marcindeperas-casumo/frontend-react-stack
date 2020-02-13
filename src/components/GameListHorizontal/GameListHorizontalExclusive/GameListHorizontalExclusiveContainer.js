// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import { GameListHorizontalSkeleton } from "../GameListHorizontalSkeleton";
import { GameListHorizontalExclusive } from "./GameListHorizontalExclusive";
import { GameListExclusiveQuery } from "./GameListHorizontalExclusive.graphql";

type Props = {
  /** The id of the game list. */
  id: string,
};

export const GameListHorizontalExclusiveContainer = ({ id }: Props) => {
  const { data, loading } = useQuery<
    A.GameListExclusiveQuery,
    A.GameListExclusiveQueryVariables
  >(GameListExclusiveQuery, { variables: { id } });

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
};
