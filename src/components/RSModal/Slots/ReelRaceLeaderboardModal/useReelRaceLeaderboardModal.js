// @flow
import * as React from "react";
import * as R from "ramda";
import { DateTime } from "luxon";
import { useDispatch } from "react-redux";
import { showModal } from "Models/modal";
import type { CurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { REACT_APP_MODAL } from "Src/constants";

export function useReelRaceLeaderboardModal(
  reelRaceInfo: ?CurrentReelRaceInfo
) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!reelRaceInfo) {
      return;
    }

    const endTime = DateTime.fromMillis(reelRaceInfo.endTime);
    const secsFromNow = endTime.diffNow().as("seconds");

    if (secsFromNow < -1 || secsFromNow > 1) {
      return;
    }

    const { position, leaderboard = [{ playerName: "BLABLA" }] } = reelRaceInfo;

    dispatch(
      showModal(REACT_APP_MODAL.ID.GAME_PAGE_RR_LEADERBOARD, {
        input: {
          position,
          winnerName: R.prop("playerName", R.head(leaderboard)),
        },
      })
    );
  }, [dispatch, reelRaceInfo]);
}
