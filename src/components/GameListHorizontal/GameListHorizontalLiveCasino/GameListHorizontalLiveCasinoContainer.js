// @flow
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import { GameListHorizontalSkeleton } from "../GameListHorizontalSkeleton";
import { GameListHorizontalLiveCasino } from "./GameListHorizontalLiveCasino";

type Props = {
  /** The id of the game list. */
  id: string,
};

export const GameListLiveCasinoQuery = gql`
  query GameListLiveCasinoQuery($id: String!) {
    seeMore: getText(
      id: "root:built-pages.top-lists-translations:fields.more_link"
    )
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

export const GameListHorizontalLiveCasinoContainer = ({ id }: Props) => {
  const variables = { id };
  const { data, loading } = useQuery(GameListLiveCasinoQuery, { variables });

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
          seeMoreText={data.seeMore}
          list={data.gamesList}
        />
      </TrackProvider>
    );
  }

  return null;
};
