// @flow
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playerIdSelector, playerCasumoNameSelector } from "Models/handshake";
import { showModal } from "Models/modal";
import type { CurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { REACT_APP_MODAL } from "Src/constants";

export function useReelRaceLeaderboardModal(
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
