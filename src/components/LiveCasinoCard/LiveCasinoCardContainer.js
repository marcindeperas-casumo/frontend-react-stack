// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";
import { launchGame } from "Services/LaunchGameService";
import * as A from "Types/apollo";
import { LiveCasinoCardCmsQuery } from "./LiveCasinoCard.graphql";

type Props = {
  game: A.GameListLiveCasinoQuery_gamesList_games,
  playNowText: string,
};

export const LiveCasinoCardContainer = ({ game, playNowText }: Props) => {
  const { data, loading } = useQuery<A.LiveCasinoCardCmsQuery, _>(
    LiveCasinoCardCmsQuery
  );

  if (loading) {
    return null;
  }

  return game.liveCasinoLobby ? (
    <LiveCasinoCard
      t={{
        betBehindText: data?.betBehindText,
        openSeatsText: data?.openSeatsText,
      }}
      game={game}
      playNowText={playNowText}
      onLaunchGame={() => launchGame({ slug: game?.slug })}
    />
  ) : null;
};
