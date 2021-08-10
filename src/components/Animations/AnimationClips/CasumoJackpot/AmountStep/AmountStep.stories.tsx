import { storiesOf } from "@storybook/react";
import React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
import { AmountStep } from "./AmountStep";

import "../../../CasumoJackpotAnimation/CasumoAnimation.scss";

const stories = storiesOf("Animations", module).addParameters({
  noGlobalDecorator: true,
});

const t = {
  buttonText: "Continue playing",
  continueText: "The money will be added to your account",
  jackpotWinTextRow: "YOU WON A",
  jackpotTypeTextRow: "{{ potName }} JACKPOT",
};

export const svgFiles = {
  pot4Borderless: "https://cms.casumo.com/wp-content/uploads/2021/07/pot4.svg",
  pot3Borderless: "https://cms.casumo.com/wp-content/uploads/2021/07/pot3.svg",
  pot2Borderless: "https://cms.casumo.com/wp-content/uploads/2021/07/pot2.svg",
  pot1Borderless: "https://cms.casumo.com/wp-content/uploads/2021/07/pot1.svg",
};

const mockConfig = {
  animationId: "mock",
  settings: {
    t,
    amount: 12413,
    currency: "EUR",
    potKey: "pot1",
    potColor: "#ABA7E1",
    potName: "Mini",
    locale: "en",
    svgFiles,
  },
};

if (isNotChromatic) {
  stories.add("Amount Step", () => (
    <div className="o-position--absolute u-width--full u-height--full u-overflow--hidden">
      <div className="c-casumo-animation__fading-in-background-layer t-background-purple-80 o-position--absolute u-width--full u-height--full" />
      <AmountStep onShowNext={() => {}} config={mockConfig} />
    </div>
  ));
}
