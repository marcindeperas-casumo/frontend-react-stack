// @flow
import React from "react";
import gql from "graphql-tag";
import { propOr } from "ramda";
import { useQuery } from "@apollo/react-hooks";
import { EVENT_PROPS, GAME_LIST_IDS } from "Src/constants";
import { GameListHorizontal } from "Components/GameListHorizontal/GameListHorizontal";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import TrackProvider from "Components/TrackProvider";

type Props = {
  /** The id of the game list. */
  id: string,
};

// __FIX__ this should really live in a .graphql file and reference th
// fragments for its child components. However when I try it explodes. :(
export const GameListQuery = gql`
  query OldGameListQuery($id: String!) {
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
        liveCasinoLobby {
          id
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

// Polling for updates is temporary.
// We are going to move to use subscriptions once the GraphQL server is ready for it.
const THIRTY_SECONDS = 30000;
const POLL_INTERVAL = {
  [GAME_LIST_IDS.LIVE_CASINO_GAMES]: THIRTY_SECONDS,
  [GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS]: THIRTY_SECONDS,
  default: 0,
};

export const GameListHorizontalContainer = ({ id }: Props) => {
  const variables = { id };
  const pollInterval = POLL_INTERVAL[id] || POLL_INTERVAL.default;
  const { data, loading } = useQuery(GameListQuery, {
    variables,
    pollInterval,
  });
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
      {/* __FIX__ Fix the seeMoreText variable here to come from GraphQL */}
      <GameListHorizontal seeMoreText="..." list={list} />
    </TrackProvider>
  );
};
