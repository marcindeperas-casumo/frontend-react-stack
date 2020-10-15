//@flow
import * as React from "react";
import { connect, useSelector } from "react-redux";
import { useCurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";
import { playingSelector } from "Models/playing";
import { isNativeByUserAgent } from "GameProviders";
import {
  playerCasumoNameSelector,
  emailSelector,
  playerNameSelector,
  playerIdSelector,
} from "Models/handshake";
import { ProfileIconWithDrawer } from "./ProfileIconWithDrawer";

type Props = {
  playerId: string,
  casumoName: string,
  email: string,
  playerName: string,
};

export const ProfileIconDrawer = ({
  playerId,
  casumoName,
  email,
  playerName,
}): Props => {
  const isNative = isNativeByUserAgent();
  const playing = useSelector(playingSelector);
  const currentReelRaceFromHook = useCurrentReelRaceInfo(playing?.gameId);
  const currentReelRace = isNative ? null : currentReelRaceFromHook;

  return (
    <ProfileIconWithDrawer
      playerId={playerId}
      email={email}
      casumoName={casumoName}
      playerName={playerName}
      currentReelRace={currentReelRace}
      disabledChat={isNative}
    />
  );
};

export const ProfileIconWithDrawerContainer = connect(state => ({
  playerId: playerIdSelector(state),
  casumoName: playerCasumoNameSelector(state),
  email: emailSelector(state),
  playerName: playerNameSelector(state),
}))(ProfileIconDrawer);
