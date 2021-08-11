import React from "react";
import {
  useGameJackpotContext,
  useGameModelContext,
} from "Components/GamePage/Contexts";
import { CasumoJackpotAnimationContainer } from "Components/Animations/CasumoJackpotAnimation/CasumoJackpotAnimationContainer";
import { useJackpotsSubscription } from "../BlueRibbonChristmas/useJackpotsSubscription";

export const IngameJackpotNotification = () => {
  const { pauseGame, resumeGame } = useGameModelContext();
  const { blueribbonJackpotForCurrentGame } = useGameJackpotContext();
  const { params, acknowledge } = useJackpotsSubscription({
    pauseGame,
    resumeGame,
  });

  if (!params) {
    return null;
  }

  const props = {
    acknowledge,
    jackpotConfig: blueribbonJackpotForCurrentGame,
    params,
  };

  //right now we only have this one jackpot animation
  return <CasumoJackpotAnimationContainer {...props} />;
};
