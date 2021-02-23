// @flow
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerIdSelector, playerCasumoNameSelector } from "Models/handshake";
import { showModal } from "Models/modal";
import type { CurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { REACT_APP_MODAL } from "Src/constants";

export function useReelRaceLeaderboardModal(
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  reelRaceInfo: ?CurrentReelRaceInfo
) {
  const dispatch = useDispatch();
  const playerId = useSelector(playerIdSelector);
  const playerName = useSelector(playerCasumoNameSelector);

  React.useEffect(() => {
    if (!reelRaceInfo || !reelRaceInfo.hasEnded) {
      return;
    }

    const { position, leaderboard, formattedPrizes, points } = reelRaceInfo;

    dispatch(
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
      showModal(REACT_APP_MODAL.ID.GAME_PAGE_RR_LEADERBOARD, {
        input: {
          playerId,
          playerName,
          points,
          position,
          leaderboard,
          prizes: formattedPrizes,
        },
      })
    );
  }, [dispatch, playerId, playerName, reelRaceInfo]);
}
