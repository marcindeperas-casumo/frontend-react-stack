// @flow
import React from "react";
import { propOr } from "ramda";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { EVENT_PROPS } from "Src/constants";
import { GameListHorizontal } from "Components/GameListHorizontal/GameListHorizontal";
import TrackProvider from "Components/TrackProvider";

type Props = {
  /** The id of the game list. */
  id: string,
};

export const GAME_LIST_QUERY = gql`
  query gameListQuery($id: String!) {
    gamesList(listId: $id) {
      id
      title
      games {
        id
        backgroundImage
        isInMaintenance
        logo
        name
        slug
        liveCasinoLobby {
          tableId
          symbol
          provider
          results
          image
          type
          betBehind
          bets {
            min
            max
            symbol
          }
        }
      }
    }
  }
`;

export const GameListHorizontalContainer = ({ id }: Props) => {
  const variables = { id };
  const { data, loading } = useQuery(GAME_LIST_QUERY, { variables });
  const list = propOr({}, "gamesList", data);

  return (
    <TrackProvider data={{ [EVENT_PROPS.LOCATION]: id }}>
      {/* __FIX__ Fix the seeMoreText variable here to come from GraphQL */}
      <GameListHorizontal seeMoreText="..." list={list} isLoading={loading} />
    </TrackProvider>
  );
};
