import React from "react";
import { useTranslations } from "Utils/hooks";
import { useLocale } from "Utils/hooks/__mocks__/useLocale";
import { animationAssetsCmsUrl } from "../constants";
import { CasumoJackpotAnimation } from "./CasumoJackpotAnimation";

export const CasumoJackpotAnimationContainer = ({
  params,
  jackpotConfig,
  acknowledge,
}) => {
  const locale = useLocale();
  const t = useTranslations(animationAssetsCmsUrl(params.jackpot_slug));

  if (!t) {
    return null;
  }

  const fields = t["text_fields"].reduce((acc, pair) => {
    return {
      ...acc,
      [pair.key]: pair.value,
    };
  }, {});

  const introTranslations = {
    buttonText: fields.buttonReveal,
    findOutText: fields.revealText,
    winText: fields.winText,
  };

  const amountTranslations = {
    buttonText: fields.continueButton,
    continueText: fields.continueText,
    jackpotWinTextRow: fields.continueWinTextRow,
    jackpotTypeTextRow: fields.continueTypeTextRow,
  };

  const animationConfig = [
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
        locale: locale,
      },
    },
  ];

  return (
    <CasumoJackpotAnimation
      animationConfig={animationConfig}
      onAnimationDone={acknowledge}
    />
  );
};
