import * as React from "react";
import { redirectTo } from "@reach/router";
import { useSelector } from "react-redux";
import { EMBEDDED_GAMES, ROUTE_IDS } from "Src/constants";
import { useTranslatedUrl } from "Utils/hooks";
import { useReelRaceOptIn } from "Utils/hooks/useReelRaceOptIn";
import * as A from "Types/apollo";
import { useLaunchGame } from "Utils/nativeBridge";
import { emailSelector } from "Models/handshake";
import { isAndroidNative, isIosNative } from "Utils/utils";
import { launchGame as koLaunchGame } from "Services/LaunchGameService";
import { useGameInfo } from "Utils/hooks/useGameInfo";
import { ReelRaceOptInPlayButton } from "./ReelRaceOptInPlayButton";

type TProps = {
  reelRace: A.ReelRaceCard_ReelRaceFragment;
  variant?: "primary" | "secondary";
  showOptedIn?: boolean;
};

export function ReelRaceOptInPlayButtonContainer(props: TProps) {
  const { optInAction } = useReelRaceOptIn(props.reelRace);
  const { game } = props.reelRace;

  const { launchGame: reactNativeLaunch } = useLaunchGame(game);
  const { isGameEmbedded } = useGameInfo(game.slug);
  const userEmail = useSelector(emailSelector);
  const gameDetailsPath = useTranslatedUrl(ROUTE_IDS.PLAY, {
    slug: game.slug,
  });

  // TODO: React Native Bridge test - TRET-753
  const playCallback = React.useMemo(
    function getPlayCallback() {
      const useReactNativeBridge = EMBEDDED_GAMES.TESTERS.includes(userEmail);

      if (isIosNative() || isAndroidNative()) {
        if (useReactNativeBridge && !isGameEmbedded) {
          return reactNativeLaunch;
        }

        return () => koLaunchGame({ slug: game.slug });
      }
      return () => redirectTo(gameDetailsPath);
    },
    [userEmail, gameDetailsPath, isGameEmbedded, reactNativeLaunch, game.slug]
  );

  return (
    <ReelRaceOptInPlayButton
      {...props}
      optIn={optInAction}
      playCallback={playCallback}
    />
  );
}
