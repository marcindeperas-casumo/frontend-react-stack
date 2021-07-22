import React from "react";
import { CasumoJackpotAnimation } from "./CasumoJackpotAnimation";

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

export const CasumoJackpotAnimationContainer = ({
  params,
  jackpotConfig,
  acknowledge,
}) => {
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
        potName: jackpotConfig.pots.find(pot => pot.potKey === params.pot_key)
          .name,
        locale: "en",
      },
    },
  ];

  <CasumoJackpotAnimation
    animationConfig={animationConfigMock}
    onAnimationDone={acknowledge}
  />;
};
