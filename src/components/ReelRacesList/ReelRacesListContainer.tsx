import { useQuery } from "@apollo/client";
import React from "react";
import { useSelector } from "react-redux";
import { GAMES_LIST_HORIZONTAL_ITEMS_LIMIT } from "Src/constants";
import * as A from "Types/apollo";
import { tournamentChannelsSelector } from "Models/handshake";
import cometd from "Models/cometd/cometd.service";
import { useTranslations } from "Utils/hooks";
import { ReelRacesList } from "./ReelRacesList";
import { ReelRaceListQuery } from "./ReelRacesListContainer.graphql";

const HALF_AN_HOUR: number = 1800000;
const TEN_MINUTES: number = 600000;

export const ReelRacesListContainer = ({ id }: { id: string }) => {
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

  const t = useTranslations<{ title: string; hot_title: string }>(
    "reel-races.reel-race-templates"
  );
  const t2 = useTranslations<{ more_link: string }>(
    "built-pages.top-lists-translations"
  );

  const reelRacesFromData = data?.reelRaces || [];
  const isHotReels = id === "hot";

  const reelRaces = isHotReels
    ? reelRacesFromData.filter(race => {
        const difference = race.startTime - Date.now();
        const from30MinsToStartTo10MinsLater =
          difference <= HALF_AN_HOUR && difference >= -TEN_MINUTES;

        // This is done to force a rerender 10 mins after the reel start so we can closet it.
        if (race.promoted) {
          setTimeout(() => {
            refetch();
          }, race.startTime + TEN_MINUTES);
        }

        return race.promoted && from30MinsToStartTo10MinsLater;
      })
    : reelRacesFromData;

  if (data && reelRaces && reelRaces.length && t && t2) {
    return (
      <ReelRacesList
        reelRaces={reelRaces}
        title={isHotReels ? t.hot_title : t.title}
        seeMore={t2.more_link}
      />
    );
  }

  return null;
};
