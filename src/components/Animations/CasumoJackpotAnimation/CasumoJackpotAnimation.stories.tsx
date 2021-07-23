import { storiesOf } from "@storybook/react";
import React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
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
  jackpotTypeTextRow: "{{ potName }}",
};

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
      amount: 12413,
      currency: "EUR",
      potKey: "pot1",
      potName: "Mini",
      locale: "en",
    },
  },
];

const AnimationContainer = () => {
  const [show, setShow] = React.useState(false);

  return show ? (
    <CasumoJackpotAnimation
      onAnimationDone={() => setShow(false)}
      animationConfig={animationConfigMock}
    />
  ) : (
    <button onClick={() => setShow(true)}>play</button>
  );
};

if (isNotChromatic) {
  stories.add("Casumo Jackpot animation", () => <AnimationContainer />);
}
