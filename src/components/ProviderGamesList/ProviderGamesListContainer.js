// @flow
import React from "react";
import { propOr } from "ramda";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ProviderGamesList from "Components/ProviderGamesList/ProviderGamesList";

type Props = {
  /** Provider slug whose games will be fetched */
  provider: string,
};

const GAME_STUDIO_GAMES_QUERY = gql`
  query gameStudioGamesQuery($slug: String!) {
    gameStudioGames(slug: $slug) {
      id
      backgroundImage
      isInMaintenance
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
`;

export const ProviderGamesListContainer = ({ provider: slug }: Props) => {
  const variables = { slug };
  const { data, loading } = useQuery(GAME_STUDIO_GAMES_QUERY, { variables });
  const games = propOr([], "gameStudioGames", data);
  const count = games.length;

  return (
    <ProviderGamesList
      title="Lofasz"
      games={games}
      loading={loading}
      count={count}
    />
  );
};
