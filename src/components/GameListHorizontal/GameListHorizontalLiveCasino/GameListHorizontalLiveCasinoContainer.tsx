import { useQuery } from "@apollo/client";
import React from "react";
import { EVENT_PROPS, GAMES_LIST_HORIZONTAL_ITEMS_LIMIT } from "Src/constants";
import * as A from "Types/apollo";
import TrackProvider from "Components/TrackProvider";
import { useTranslations } from "Utils/hooks";
import { GameListHorizontalSkeleton } from "../GameListHorizontalSkeleton";
import { GameListHorizontalLiveCasino } from "./GameListHorizontalLiveCasino";
import { GameListLiveCasinoQuery } from "./GameListHorizontalLiveCasino.graphql";

type Props = {
  /** The id of the game list. */
  id: string;
  /** The number of games to show */
  numberOfGames: number;
};

export const GameListHorizontalLiveCasinoContainer = React.memo<Props>(
  ({ id, numberOfGames = GAMES_LIST_HORIZONTAL_ITEMS_LIMIT }: Props) => {
    const { data, loading } = useQuery<
      A.GameListLiveCasinoQuery,
      A.GameListLiveCasinoQueryVariables
    >(GameListLiveCasinoQuery, { variables: { id, numberOfGames } });

    const translationsBuiltPages = useTranslations<{ more_link: string }>(
      "built-pages.top-lists-translations"
    );

    if (loading) {
      return (
        <div className="o-wrapper">
          <GameListHorizontalSkeleton key={`game-list-skeleton-${id}`} />
        </div>
      );
    }

    if (
      data &&
      data.gamesList &&
      data.gamesList.games.length &&
      translationsBuiltPages
    ) {
      return (
        <TrackProvider data={{ [EVENT_PROPS.LOCATION]: id }}>
          <GameListHorizontalLiveCasino
            seeMoreText={translationsBuiltPages.more_link}
            list={data.gamesList}
          />
        </TrackProvider>
      );
    }

    return null;
  }
);
