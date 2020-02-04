// @flow
import React from "react";
import gql from "graphql-tag";
import { propOr } from "ramda";
import { useQuery } from "@apollo/react-hooks";
import { EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import { GameListHorizontalSkeleton } from "../GameListHorizontalSkeleton";
import { GameListHorizontalDefault } from "./GameListHorizontalDefault";

type Props = {
  /** The id of the game list. */
  id: string,
};

// __FIX__ this should really live in a .graphql file and reference th
// fragments for its child components. However when I try it explodes. :(
export const GameListQuery = gql`
  query gameListQuery($id: String!) {
    gamesList(listId: $id) {
      id
      title
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

export const GameListHorizontalDefaultContainer = ({ id }: Props) => {
  const variables = { id };
  const { data, loading } = useQuery(GameListQuery, { variables });
  const list = propOr({}, "gamesList", data);

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
        <GameListHorizontalDefault list={list} />
      </TrackProvider>
    );
  }

  return null;
};
