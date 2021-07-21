import React from "react";
import {
  useGameJackpotContext,
  useGameModelContext,
} from "Components/GamePage/Contexts";
import { CasumoJackpotAnimation } from "Components/Animations/CasumoJackpotAnimation/CasumoJackpotAnimation";
import { useJackpotsSubscription } from "../BlueRibbonChristmas/useJackpotsSubscription";

const introTranslations = {
  buttonText: "Reveal",
  findOutText: "Find out which Jackpot you won",
  winText: "YOU WON A JACKPOT!",
};

const amountTranslations = {
  buttonText: "Continue playing",
  continueText: "The money will be added to your account",
  jackpotWinTextRow: "YOU WON A",
  jackpotTypeTextRow: "{{ potName }}",
};

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

  const animationConfigMock = [
    {
      animationId: "casumoJackpotIntro",
      settings: { t: introTranslations },
    },
    {
      animationId: "casumoJackpotTransition",
      isTransition: true,
      settings: {},
    },
    {
      animationId: "casumoJackpotAmount",
      settings: {
        t: amountTranslations,
        amount: params.amount,
        currency: params.currency,
        potKey: params.pot_key,
        potName: blueribbonJackpotForCurrentGame.pots.find(
          pot => pot.potKey === params.pot_key
        ).name,
        locale: "en",
      },
    },
  ];

  // get translations and jackpot config context data to fill the rest

  return (
    <CasumoJackpotAnimation
      animationConfig={animationConfigMock}
      onAnimationDone={acknowledge}
    />
  );
};
