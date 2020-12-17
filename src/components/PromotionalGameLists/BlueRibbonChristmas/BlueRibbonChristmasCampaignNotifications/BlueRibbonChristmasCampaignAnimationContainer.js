// @flow
import * as React from "react";
import { useGameModelContext } from "Components/GamePage/Contexts";
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
    consumeEvent,
  } = useJackpotsSubscription({
    pauseGame,
    resumeGame,
  });

  const onClose = () => {
    resumeGame();
    consumeEvent();
  };

  return (
    isFullScreen &&
    jackpotAmountRaw &&
    type && (
      <BlueRibbonAnimation
        type={typesToAnimationMap[type]}
        amount={jackpotAmountRaw}
        onClose={onClose}
      />
    )
  );
};
