// @flow
import React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { navigateById } from "Services/NavigationService";
import TrackProvider from "Components/TrackProvider";
import { EVENT_PROPS, EVENT_LOCATIONS } from "Src/constants";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './GameDetails.graphql' or its ... Remove this comment to see the full error message
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
        {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message */}
        <GameDetails game={data.game} t={t} />
      </TrackProvider>
    );
  }

  return null;
};
