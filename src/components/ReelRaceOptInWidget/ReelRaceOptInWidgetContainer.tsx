import * as React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { useGameModelContext } from "Components/GamePage/Contexts";
import { EMBEDDED_GAMES } from "Src/constants";
import { emailSelector } from "Models/handshake";
import { useGameInfo } from "Utils/hooks/useGameInfo";
import { isAndroidNative, isIosNative } from "Utils/utils";
import { ReelRaceOptInWidgetQuery } from "./ReelRaceOptInWidget.graphql";
import { ReelRaceOptInWidget } from "./ReelRaceOptInWidget";

export function ReelRaceOptInWidgetContainer() {
  const { slug: currentGameSlug } = useGameModelContext();

  const { data: closestReelRace, loading: closestRRLoading } = useQuery<
    A.ReelRaceOptInWidgetQuery,
    A.ReelRaceOptInWidgetQueryVariables
  >(ReelRaceOptInWidgetQuery, {
    variables: {
      prioritisePromoted: false,
      limit: 1,
    },
  });

  const reelRaceGame = closestReelRace?.reelRaces?.[0];
  const currentGameIsClosestRROptedIn =
    reelRaceGame?.game?.slug === currentGameSlug && reelRaceGame?.optedIn;

  const userEmail = useSelector(emailSelector);
  const isUserTester = EMBEDDED_GAMES.TESTERS.includes(userEmail);
  const { isGameEmbedded } = useGameInfo(reelRaceGame?.game?.slug);
  const isNative = isIosNative() || isAndroidNative();
  const reactNativeBridgeAvailable =
    isUserTester && !isGameEmbedded && isNative;

  if (
    !reelRaceGame ||
    closestRRLoading ||
    currentGameIsClosestRROptedIn ||
    !reactNativeBridgeAvailable
  ) {
    return null;
  }

  return (
    <ReelRaceOptInWidget
      reelRace={reelRaceGame as A.ReelRaceCard_ReelRaceFragment}
    />
  );
}
