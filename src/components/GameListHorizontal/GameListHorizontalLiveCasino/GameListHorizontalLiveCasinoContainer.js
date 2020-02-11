// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { EVENT_PROPS } from "Src/constants";
import * as A from "Types/apollo";
import TrackProvider from "Components/TrackProvider";
import { GameListHorizontalSkeleton } from "../GameListHorizontalSkeleton";
import { GameListHorizontalLiveCasino } from "./GameListHorizontalLiveCasino";
import { GameListLiveCasinoQuery } from "./GameListHorizontalLiveCasino.graphql";
type Props = {
  /** The id of the game list. */
  id: string,
};

export const GameListHorizontalLiveCasinoContainer = ({ id }: Props) => {
  const variables = { id };
  const { data, loading } = useQuery<
    A.GameListLiveCasinoQuery,
    A.GameListLiveCasinoQueryVariables
  >(GameListLiveCasinoQuery, { variables });

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
        <GameListHorizontalLiveCasino
          seeMoreText={data.seeMoreText}
          list={data.gamesList}
        />
      </TrackProvider>
    );
  }

  return null;
};
