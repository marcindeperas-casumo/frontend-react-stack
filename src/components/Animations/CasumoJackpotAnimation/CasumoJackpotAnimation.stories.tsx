import { storiesOf } from "@storybook/react";
import React from "react";
import { isChromatic } from "Storybook/isNotChromatic";
import { CasumoJackpotAnimation } from "./CasumoJackpotAnimation";

const stories = storiesOf("Animations", module).addParameters({
  noGlobalDecorator: true,
});

if (!isChromatic) {
  stories.add("Casumo Jackpot animation", () => <CasumoJackpotAnimation />);
}
