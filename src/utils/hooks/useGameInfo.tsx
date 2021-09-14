import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { GameDetailsQuery } from "Components/GameDetails/GameDetails.graphql";

export function useGameInfo(slug: string) {
  const { loading, data, error } = useQuery<
    A.GameDetailsQuery,
    A.GameDetailsQueryVariables
  >(GameDetailsQuery, {
    variables: { slug },
  });

  return {
    gameInfo: data,
    isGameEmbedded: !loading && (Boolean(data) && Boolean(data.game) && !!error),
  };
}
