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

const mockConfig = {
  animationId: "mock",
  settings: {
    t,
    amount: 12413,
    currency: "EUR",
    potKey: "pot1",
    potName: "Mini",
    locale: "en",
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
