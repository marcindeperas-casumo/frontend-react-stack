// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GAME_LIST_IDS, EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationGql";
import MustDropJackpotsList from "./MustDropJackpotsList";
import { MustDropJackpotsGamesListQuery } from "./MustDropJackpotsListContainer.graphql";

const MustDropJackpotsListContainer = () => {
  const { data, loading } = useQuery<
    A.MustDropJackpotsGamesListQuery,
    A.MustDropJackpotsGamesListQueryVariables
  >(MustDropJackpotsGamesListQuery, {
    variables: {
      id: GAME_LIST_IDS.MUST_DROP_JACKPOTS_GAMES,
      numberOfGames: 20,
    },
  });

  const { t, loading: cmsLoading } = useTranslationsGql({
    seeMoreText: "root:built-pages.top-lists-translations:fields.more_link",
  });

  if (loading || cmsLoading) {
    // __FIX__ - do we need a skeleton here?
    return null;
  }

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

// seeMoreText: getText(
//   id: "root:built-pages.top-lists-translations:fields.more_link"
// )
