// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GAME_LIST_IDS, EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import MustDropJackpotsList from "./MustDropJackpotsList";
import { MustDropJackpotsGamesListQuery } from "./MustDropJackpotsListContainer.graphql";

const MustDropJackpotsListContainer = () => {
  const { data } = useQuery<
    A.MustDropJackpotsGamesListQuery,
    A.MustDropJackpotsGamesListQueryVariables
  >(MustDropJackpotsGamesListQuery, {
    variables: {
      id: GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES,
      numberOfGames: 20,
    },
  });

  const { t } = useTranslationsGql({
    seeMoreText: "root:built-pages.top-lists-translations:fields.more_link",
  });

  if (data && data.gamesList && data.gamesList.games) {
    return (
      <TrackProvider
        data={{ [EVENT_PROPS.LOCATION]: "Must Drop Jackpots - Top Lists" }}
      >
        <MustDropJackpotsList
          jackpots={data.gamesList.games}
          name={data.gamesList?.name}
          seeMoreText={t.seeMoreText}
        />
      </TrackProvider>
    );
  }

  return null;
};

export default MustDropJackpotsListContainer;
