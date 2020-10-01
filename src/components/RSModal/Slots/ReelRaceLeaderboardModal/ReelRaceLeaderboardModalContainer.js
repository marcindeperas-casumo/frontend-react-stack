// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { playingSelector } from "Models/playing";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { ReelRaceLeaderboardModal } from "./ReelRaceLeaderboardModal";

type Props = {
  acceptModal: () => void,
};

export function ReelRaceLeaderboardModalContainer({ acceptModal }: Props) {
  const playing = useSelector(playingSelector);
  const reelRaceInfo = useCurrentReelRaceInfo(playing?.gameId);

  if (!reelRaceInfo) {
    return null;
  }

  return (
    <ReelRaceLeaderboardModal
      acceptModal={acceptModal}
      place={reelRaceInfo.position}
    />
  );
}
