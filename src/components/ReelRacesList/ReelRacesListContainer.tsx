// @flow
import React from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import { GAMES_LIST_HORIZONTAL_ITEMS_LIMIT } from "Src/constants";
import * as A from "Types/apollo";
import { tournamentChannelsSelector } from "Models/handshake";
import cometd from "Models/cometd/cometd.service";
import { useTranslations } from "Utils/hooks";
import { ReelRacesList } from "./ReelRacesList";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './ReelRacesListContainer.graph... Remove this comment to see the full error message
import { ReelRaceListQuery } from "./ReelRacesListContainer.graphql";

export const ReelRacesListContainer = () => {
  const { data, refetch } = useQuery<
    A.ReelRaceListQuery,
    A.ReelRaceListQueryVariables
  >(ReelRaceListQuery, {
    variables: {
      limit: GAMES_LIST_HORIZONTAL_ITEMS_LIMIT,
    },
  });

  const tournamentChannels = useSelector(tournamentChannelsSelector);

  // todo: TRET-468 consolidate these subscriptions that are repeated in different areas, ex. in useCurrentReelRaceInfo hook
  React.useEffect(() => {
    tournamentChannels.forEach(channel =>
      cometd.subscribe(
        `${channel}/tournaments/tournamentProperties/status`,
        () => {
          refetch();
        }
      )
    );

    return function cleanup() {
      tournamentChannels.forEach(channel =>
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        cometd.unsubscribe(`${channel}/tournaments/tournamentProperties/status`)
      );
    };
  }, [refetch, tournamentChannels]);

  React.useEffect(() => {
    tournamentChannels.forEach(channel =>
      cometd.subscribe(
        `${channel}/tournaments/tournamentEvents/finished`,
        () => {
          refetch();
        }
      )
    );

    return function cleanup() {
      tournamentChannels.forEach(channel =>
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
        cometd.unsubscribe(`${channel}/tournaments/tournamentEvents/finished`)
      );
    };
  }, [refetch, tournamentChannels]);

  const t = useTranslations<{ title: string }>(
    "reel-races.reel-race-templates"
  );
  const t2 = useTranslations<{ more_link: string }>(
    "built-pages.top-lists-translations"
  );

  const reelRaces = data?.reelRaces || [];

  if (data && reelRaces && reelRaces.length && t && t2) {
    return (
      <ReelRacesList
        reelRaces={reelRaces}
        title={t.title}
        seeMore={t2.more_link}
      />
    );
  }

  return null;
};
