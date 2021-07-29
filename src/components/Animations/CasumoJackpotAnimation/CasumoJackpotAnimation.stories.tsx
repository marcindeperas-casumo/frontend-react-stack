import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";
import React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
import { wheelProps } from "../AnimationClips/CasumoJackpot/WheelStep/constants";
import { svgFiles } from "../AnimationClips/CasumoJackpot/AmountStep/AmountStep.stories";
import { CasumoJackpotAnimation } from "./CasumoJackpotAnimation";

const stories = storiesOf("Animations", module).addParameters({
  noGlobalDecorator: true,
});

const introTranslations = {
  buttonText: "Reveal",
  findOutText: "Find out which Jackpot you won",
  winText: "YOU WON A JACKPOT!",
};

const amountTranslations = {
  buttonText: "Continue playing",
  continueText: "The money will be added to your account",
  jackpotWinTextRow: "YOU WON A",
  jackpotTypeTextRow: "{{ potName }} JACKPOT",
};

function getAnimationConfigMock(wonPotKey) {
  return [
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
      animationId: "casumoJackpotWheel",
      settings: {
        wonPotKey,
        ...wheelProps,
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
        t: amountTranslations,
        amount: 12413,
        currency: "EUR",
        potKey: wonPotKey,
        potName: wheelProps.t[wonPotKey],
        potColor: wheelProps.potColors[wonPotKey],
        locale: "en",
        svgFiles,
      },
    },
    {
      animationId: "casumoJackpotTransition",
      isTransition: true,
      settings: {},
    },
  ];
}

const AnimationContainer = () => {
  const [show, setShow] = React.useState(false);
  const pot = select("pot", ["pot1", "pot2", "pot3", "pot4"], "pot1");

  return show ? (
    <CasumoJackpotAnimation
      onAnimationDone={() => setShow(false)}
      animationConfig={getAnimationConfigMock(pot)}
    />
  ) : (
    <button onClick={() => setShow(true)}>play</button>
  );
};

if (isNotChromatic) {
  stories.add("Casumo Jackpot animation", () => <AnimationContainer />);
}
