// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { EVENT_PROPS, GAMES_LIST_HORIZONTAL_ITEMS_LIMIT } from "Src/constants";
import * as A from "Types/apollo";
import TrackProvider from "Components/TrackProvider";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { GameListHorizontalSkeleton } from "../GameListHorizontalSkeleton";
import { GameListHorizontalLiveCasino } from "./GameListHorizontalLiveCasino";
import { GameListLiveCasinoQuery } from "./GameListHorizontalLiveCasino.graphql";
type Props = {
  /** The id of the game list. */
  id: string,
  /** The number of games to show */
  numberOfGames: number,
};

export const GameListHorizontalLiveCasinoContainer = ({
  id,
  numberOfGames = GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
}: Props) => {
  const { data, loading } = useQuery<
    A.GameListLiveCasinoQuery,
    A.GameListLiveCasinoQueryVariables
  >(GameListLiveCasinoQuery, { variables: { id, numberOfGames } });

  const { t } = useTranslationsGql({
    seeMoreText: "root:built-pages.top-lists-translations:fields.more_link",
    playNowText: "root:mobile.live-casino-cards-content:fields.play_now",
  });

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
          seeMoreText={t.seeMoreText}
          playNowText={t.playNowText}
          list={data.gamesList}
        />
      </TrackProvider>
    );
  }

  return null;
};
