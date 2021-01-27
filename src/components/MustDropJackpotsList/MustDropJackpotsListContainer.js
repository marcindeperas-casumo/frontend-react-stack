// @flow
import * as React from "react";
import * as R from "ramda";
import { useQuery } from "@apollo/client";
import { GAME_LIST_IDS, EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks/useTranslations";
import { GameListHorizontalWithWidget } from "Components/GameListHorizontal/GameListHorizontalWithWidget";
import MustDropJackpotsWidget from "Components/MustDropJackpotsWidget";
import { MustDropJackpotsGamesListQuery } from "./MustDropJackpotsListContainer.graphql";

export const MustDropJackpotsListContainer = () => {
  const { data } = useQuery<
    A.MustDropJackpotsGamesListQuery,
    A.MustDropJackpotsGamesListQueryVariables
  >(MustDropJackpotsGamesListQuery, {
    variables: {
      id: GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES,
      numberOfGames: 20,
    },
  });

  const t = useTranslations<{ more_link: string }>(
    "built-pages.top-lists-translations"
  );

  if (t && data?.gamesList?.games) {
    return (
      <TrackProvider
        data={{ [EVENT_PROPS.LOCATION]: "Must Drop Jackpots - Top Lists" }}
      >
        <GameListHorizontalWithWidget
          name={R.pathOr([], ["gamesList", "name"], data)}
          games={R.pathOr([], ["gamesList", "games"], data)}
          Widget={MustDropJackpotsWidget}
          seeMore={{
            text: t.more_link,
            url: "../must-drop-jackpots",
          }}
        />
      </TrackProvider>
    );
  }

  return null;
};
