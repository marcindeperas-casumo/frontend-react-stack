import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import * as A from "Types/apollo";
import { ROUTE_IDS, REACT_APP_MODAL } from "Src/constants";
import {
  useJurisdiction,
  useTranslatedUrl,
  useTranslations,
} from "Utils/hooks";
import { useReelRaceOptIn } from "Utils/hooks/useReelRaceOptIn";
import { useLaunchGame } from "Utils/nativeBridge";
import { isAndroidNative, isIosNative } from "Utils/utils";
import { launchGame as koLaunchGame } from "Services/LaunchGameService";
import { useGameInfo } from "Utils/hooks/useGameInfo";
import { showModal } from "Models/modal";
import { ReelRaceOptInPlayButton } from "./ReelRaceOptInPlayButton";

type TProps = {
  reelRace: A.ReelRaceCard_ReelRaceFragment;
  variant?: "primary" | "secondary";
  showOptedIn?: boolean;
};

export function ReelRaceOptInPlayButtonContainer(props: TProps) {
  const dispatch = useDispatch();
  const { isUKGC } = useJurisdiction();
  const { optInAction } = useReelRaceOptIn(props.reelRace);
  const { game } = props.reelRace;

  const { launchGame: reactNativeLaunch } = useLaunchGame(game);
  const { isGameEmbedded } = useGameInfo(game.slug);
  const gameDetailsPath = useTranslatedUrl(ROUTE_IDS.PLAY, {
    slug: game.slug,
  });

  const translations = useTranslations<{
    terms_link_text: string;
  }>("mobile.footer");

  // TODO: React Native Bridge test - TRET-753
  const playCallback = React.useMemo(
    function getPlayCallback() {
      if (isIosNative() || isAndroidNative()) {
        if (!isGameEmbedded) {
          return reactNativeLaunch;
        }

        return () => koLaunchGame({ slug: game.slug });
      }

      // eslint-disable-next-line fp/no-mutation
      return () => (window.location.href = `/${gameDetailsPath}`);
    },
    [gameDetailsPath, isGameEmbedded, reactNativeLaunch, game.slug]
  );

  const showTAC = useCallback(
    () => dispatch(showModal(REACT_APP_MODAL.ID.REEL_RACES_TAC)),
    [dispatch]
  );

  return (
    <ReelRaceOptInPlayButton
      {...props}
      optIn={optInAction}
      playCallback={playCallback}
      tacTranslations={translations}
      showExtraTAC={isUKGC}
      onShowTAC={showTAC}
    />
  );
}
