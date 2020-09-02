// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GAME_LIST_IDS, EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";
import * as A from "Types/apollo";
import { MustDropJackpotList } from "./MustDropJackpotList";
import { MustDropJackpotGamesListQuery } from "./MustDropJackpotListContainer.graphql";

const MustDropJackpotListContainer = () => {
  const { data, loading } = useQuery<
    A.MustDropJackpotGamesListQuery,
    A.MustDropJackpotGamesListQueryVariables
  >(MustDropJackpotGamesListQuery, {
    variables: {
      id: GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES,
    },
  });

  if (loading) {
    return <GameListSkeleton className="u-padding--md" hasTitle={false} />;
  }

  if (data && data.gamesList && data.gamesList.games) {
    return (
      <TrackProvider
        data={{ [EVENT_PROPS.LOCATION]: "Must Drop Jackpots - Page" }}
      >
        <MustDropJackpotList jackpots={data.gamesList.games} />
      </TrackProvider>
    );
  }
};

export default MustDropJackpotListContainer;
