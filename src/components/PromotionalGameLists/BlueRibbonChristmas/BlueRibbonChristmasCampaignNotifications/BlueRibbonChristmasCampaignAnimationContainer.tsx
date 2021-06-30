import * as React from "react";
import {
  useGameModelContext,
  useGameJackpotContext,
} from "Components/GamePage/Contexts";
import { useTranslations } from "Utils/hooks";
import { BlueRibbonAnimation } from "Components/BlueRibbon";
import { useJackpotsSubscription } from "../useJackpotsSubscription";

const typesToAnimationMap = {
  jackpot_win_mini: "mini",
  jackpot_win_major: "major",
  jackpot_win_mega: "mega",
  community_jackpot_win: "",
};

export const BlueRibbonChristmasCampaignAnimationContainer = () => {
  const { pauseGame, resumeGame } = useGameModelContext();

  const {
    isFullScreen,
    jackpotAmountRaw,
    type,
    acknowledge,
  } = useJackpotsSubscription({
    pauseGame,
    resumeGame,
  });

  const { setBlueRibbonNotificationNeedsAccepting } = useGameJackpotContext();

  const t = useTranslations("blue-ribbon-christmas.jackpot-animation-screen");

  const onClose = () => {
    acknowledge();
    setBlueRibbonNotificationNeedsAccepting(false);
  };

  return (
    isFullScreen &&
    jackpotAmountRaw &&
    type && (
      <BlueRibbonAnimation
        t={t}
        type={typesToAnimationMap[type]}
        amount={jackpotAmountRaw}
        onClose={onClose}
      />
    )
  );
};
