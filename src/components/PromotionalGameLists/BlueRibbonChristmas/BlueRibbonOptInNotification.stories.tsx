import { storiesOf } from "@storybook/react";
import React from "react";
import MockStore from "Components/MockStore";
import { genMocksForUseTranslations } from "Utils/testUtils";
import { BlueRibbonOptInNotification } from "./BlueRibbonOptInNotification";

const state = genMocksForUseTranslations("jackpots-configs.casumo-jackpots", {
  jackpot_image:
    "https://cms.casumo.com/wp-content/uploads/2021/06/casumo_jackpot_logo.svg",
  opt_in_cta: "Opt-in to Casumo Jackpots,",
  opt_in_t_and_c_apply: "T&C apply",
  opt_in_contribution_value: "Contribution to jackpot: +15%",
  opt_in_notification_title:
    "Yay, now you are in for huge drops in our Jackpots",
  opt_in_notification_content:
    "There will be an extra 15% charge on top of your normal game directed to the pots.",
});
const stories = storiesOf("BlueRibbon", module);
stories.add("Opt in notification", () => (
  <MockStore state={state}>
    <BlueRibbonOptInNotification
      jackpotSlug="casumo-jackpots"
      onClose={() => {}}
    />
  </MockStore>
));
