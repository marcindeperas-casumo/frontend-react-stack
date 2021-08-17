import { storiesOf } from "@storybook/react";
import React from "react";
import * as R from "ramda";
import MockStore from "Components/MockStore";
import { genMocksForUseTranslations } from "Utils/testUtils";
import { BlueRibbonManualOptInAndOptOut } from "./BlueRibbonManualOptInAndOptOut";

const state1 = genMocksForUseTranslations("jackpots-configs.casumo-jackpots", {
  opt_in_cta: "Opt-in to Casumo Jackpots,",
  opt_in_t_and_c_apply: "T&C apply",
  opt_in_contribution_value: "Contribution to jackpot: +15%",
  opt_in_notification_title:
    "Yay, now you are in for huge drops in our Jackpots",
  opt_in_notification_content:
    "There will be an extra 15% charge on top of your normal game directed to the pots.",
});
const state2 = genMocksForUseTranslations("toggle", {
  on: "PÄÄLLÄ",
  off: "POIS",
});
const state = R.mergeDeepLeft(state1, state2);
const stories = storiesOf("BlueRibbon", module);
stories.add("Manual opt in/out, default", () => (
  <MockStore state={state}>
    <BlueRibbonManualOptInAndOptOut jackpotSlug="casumo-jackpots" />
  </MockStore>
));
stories.add("Manual opt in/out, light", () => (
  <MockStore state={state}>
    <BlueRibbonManualOptInAndOptOut jackpotSlug="casumo-jackpots" isLight />
  </MockStore>
));
