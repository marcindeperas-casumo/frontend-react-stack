import * as React from "react";
import * as A from "Types/apollo";
import { useGameModelContext } from "Components/GamePage/Contexts";
import { isAndroidNative, isIosNative } from "Utils/utils";
import { ReelRaceOptInWidget } from "./ReelRaceOptInWidget";

type TProps = {
  nextRR: Partial<A.ReelRaceCard_ReelRaceFragment>;
};

export function ReelRaceOptInWidgetContainer({ nextRR: reelRaceGame }: TProps) {
  const { slug: currentGameSlug } = useGameModelContext();

  const currentGameIsClosestRROptedIn =
    reelRaceGame?.game?.slug === currentGameSlug && reelRaceGame?.optedIn;
  const isNative = isIosNative() || isAndroidNative();

  if (!reelRaceGame || currentGameIsClosestRROptedIn || isNative) {
    return null;
  }

  return (
    <ReelRaceOptInWidget
      reelRace={reelRaceGame as A.ReelRaceCard_ReelRaceFragment}
    />
  );
}
