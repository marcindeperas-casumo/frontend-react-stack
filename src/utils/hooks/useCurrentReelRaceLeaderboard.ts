import * as React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import cometd from "Models/cometd/cometd.service";
import { playerIdSelector } from "Models/handshake";
import { updateLeaderboard, initializeLeaderboard } from "Models/reelRaces";
import type { CometdLeaderboardUpdate } from "Models/reelRaces";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { useCallOnce } from "./useCallOnce";

export function useCurrentReelRaceLeaderboard(
  currentGameSlug: string | undefined
) {
  const dispatch = useDispatch();
  const playerId = useSelector(playerIdSelector, shallowEqual);

  const reelRaceQueryData = useCurrentReelRaceInfo(currentGameSlug);
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'cometdChannels' does not exist on type '... Remove this comment to see the full error message
  const { cometdChannels, tournamentId } = reelRaceQueryData || {};

  useCallOnce(reelRaceQueryData && reelRaceQueryData.leaderboard, () =>
    dispatch(initializeLeaderboard(reelRaceQueryData.leaderboard))
  );

  React.useEffect(() => {
    if (cometdChannels) {
      const handleLeaderboardUpdate = ({
        data: { leaderboard },
      }: CometdLeaderboardUpdate) => dispatch(updateLeaderboard(leaderboard));

      cometdChannels.forEach(channel => {
        cometd.subscribe(
          `${channel}/tournaments/players/${playerId}/tournaments/${tournamentId}/leaderboard`,
          handleLeaderboardUpdate
        );
      });

      return () => {
        cometdChannels.forEach(channel => {
          cometd.unsubscribe(
            `${channel}/tournaments/players/${playerId}/tournaments/${tournamentId}/leaderboard`,
            handleLeaderboardUpdate
          );
        });
      };
    }
  }, [cometdChannels, dispatch, playerId, tournamentId]);

  return null;
}
