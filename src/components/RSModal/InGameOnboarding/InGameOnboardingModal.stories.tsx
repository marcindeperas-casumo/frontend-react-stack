import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockDate from "mockdate";
import * as React from "react";
import { isChromatic } from "Storybook/isNotChromatic";
import { InGameOnboardingModal } from "./InGameOnboardingModal";

if (isChromatic) {
  MockDate.set(new Date("2020-01-01T14:54:10").toString());
}

const cmsContent = {
  details_image:
    "https://cms.casumo.com/wp-content/uploads/2020/12/ggl-pause-break.svg",
  onboarding_title: "Ready to try Casumo Jackpots?",
  onboarding_text:
    "You’re about to play a Casumo Jackpots game. Select ‘Play with jackpots’ for a chance to win 1 of 4 progressive jackpots that can drop on any spin. The next jackpot could be yours!",
  rules_text:
    "By opting-in you agree to contribute 10 cents per round to the total prize pool. T&C apply",
  button_accept: "Play with jackpots",
  button_deny: "Play normally",
};

const stories = storiesOf("RSModal/GameLaunch", module);
stories.add("Finished", () => {
  return (
    <InGameOnboardingModal
      t={{ ...cmsContent }}
      config={{ slug: "casumo-jackpots" }}
      acceptModal={action("accepted modal")}
      cancelModal={action("cancel modal")}
    />
  );
});
