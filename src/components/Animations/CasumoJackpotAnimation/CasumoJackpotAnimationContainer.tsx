// @ts-nocheck

import React from "react";
import * as R from "ramda";
import { useTranslations, useLocale } from "Utils/hooks";
import { animationAssetsCmsUrl } from "../constants";
import { CasumoJackpotAnimation } from "./CasumoJackpotAnimation";

type CmsObj = {
  key: string;
  value: string;
};
function parseIfPossible(s: string) {
  try {
    return JSON.parse(s);
  } catch (e) {
    return s;
  }
}
const cmsObjToObj = R.pipe<
  readonly CmsObj[],
  Array<[string, string]>,
  { [key: string]: string }
>(
  R.map(x => [x.key, parseIfPossible(x.value)]),
  R.fromPairs
);
export const CasumoJackpotAnimationContainer = ({
  params,
  jackpotConfig,
  acknowledge,
}) => {
  const locale = useLocale();
  const t = useTranslations<{
    text: Array<CmsObj>;
    assets: Array<CmsObj>;
    colour_map: Array<CmsObj>;
    step_specific_config: Array<{ step: CmsObj[] }>;
  }>(animationAssetsCmsUrl(params.jackpot_slug));

  if (!t) {
    return null;
  }

  const textFields = cmsObjToObj(t.text);
  const svgFiles = cmsObjToObj(t.assets);
  const potColors = cmsObjToObj(t.colour_map);
  const stepSpecificConfig = t.step_specific_config.map(x => {
    if (x.step) {
      return cmsObjToObj(x.step);
    }

    return {};
  });

  const potSvgsForIntro = Object.keys(potColors).map(
    x => svgFiles[`${x}Borderless`]
  );

  const introTranslations = {
    buttonText: textFields.buttonReveal,
    findOutText: textFields.revealText,
    winText: textFields.winText,
  };

  const amountTranslations = {
    buttonText: textFields.continueButton,
    continueText: textFields.continueText,
    jackpotWinTextRow: textFields.continueWinTextRow,
    jackpotTypeTextRow: textFields.continueTypeTextRow,
  };

  const animationConfig = [
    {
      animationId: "casumoJackpotIntro",
      settings: { t: introTranslations, potSvgsForIntro },
    },
    {
      animationId: "casumoJackpotTransition",
      isTransition: true,
      settings: {},
    },
    {
      animationId: "casumoJackpotWheel",
      settings: {
        svgFiles,
        potColors,
        t: textFields,
        wonPotKey: params.pot_key,
        ...stepSpecificConfig[1],
      },
    },
    {
      animationId: "casumoJackpotTransition",
      isTransition: true,
      settings: {},
    },
    {
      animationId: "casumoJackpotAmount",
      settings: {
        svgFiles,
        t: amountTranslations,
        amount: params.amount,
        currency: params.currency,
        potKey: params.pot_key,
        potName: jackpotConfig.pots.find(pot => pot.potKey === params.pot_key)
          .shortName,
        potColor: potColors[params.pot_key],
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
