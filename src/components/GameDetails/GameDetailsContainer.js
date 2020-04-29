// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { navigateById } from "Services/NavigationService";
import TrackProvider from "Components/TrackProvider";
import { EVENT_PROPS, EVENT_LOCATIONS } from "Src/constants";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { GameDetailsQuery } from "./GameDetails.graphql";
import { GameDetailsSkeleton } from "./GameDetailsSkeleton";
import { GameDetails } from "./GameDetails";

export const GameDetailsContainer = ({ slug }: { slug: string }) => {
  const { loading, data } = useQuery<
    A.GameDetailsQuery,
    A.GameDetailsQueryVariables
  >(GameDetailsQuery, {
    variables: { slug },
  });
  const { t, loading: cmsLoading } = useTranslationsGql({
    playButtonText: "root:mobile.game-details:fields.play_button_text",
    practiceButtonText: "root:mobile.game-details:fields.practice_button_text",
    gameInMaintenanceText:
      "root:mobile.game-details:fields.temporarily_unavailable",
  });

  if (loading || cmsLoading) {
    return <GameDetailsSkeleton />;
  }

  if (!loading && data && !data.game) {
    navigateById({ routeId: "404" });
  }

  if (!loading && data && data.game) {
    return (
      <TrackProvider
        data={{ [EVENT_PROPS.LOCATION]: EVENT_LOCATIONS.GAME_DETAILS }}
      >
        <GameDetails data={data} t={t} />
      </TrackProvider>
    );
  }

  return null;
};
