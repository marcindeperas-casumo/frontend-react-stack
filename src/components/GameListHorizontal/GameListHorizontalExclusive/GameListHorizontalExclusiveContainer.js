// @flow
import React from "react";
import gql from "graphql-tag";
import { propOr } from "ramda";
import { useQuery } from "@apollo/react-hooks";
import { EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import { GameListHorizontalSkeleton } from "../GameListHorizontalSkeleton";
import { GameListHorizontalExclusive } from "./GameListHorizontalExclusive";

type Props = {
  /** The id of the game list. */
  id: string,
};

export const GameListExclusiveQuery = gql`
  query GameListExclusiveQuery($id: String!) {
    gamesList(listId: $id) {
      id
      name
      games {
        id
        backgroundImage
        isInMaintenance
        isInMyList
        logo
        name
        slug
      }
    }
  }
`;

export const GameListHorizontalExclusiveContainer = ({ id }: Props) => {
  const variables = { id };
  const { data, loading } = useQuery(GameListExclusiveQuery, { variables });
  const list = propOr({}, "gamesList", data);

  if (loading) {
    return (
      <div className="o-wrapper">
        <GameListHorizontalSkeleton key={`game-list-skeleton-${id}`} />
      </div>
    );
  }

  return (
    <TrackProvider data={{ [EVENT_PROPS.LOCATION]: id }}>
      <GameListHorizontalExclusive list={list} />
    </TrackProvider>
  );
};
