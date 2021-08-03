import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockDate from "mockdate";
import * as React from "react";
import { isChromatic } from "Storybook/isNotChromatic";
import { GameLaunchOnboardingModal } from "./index";

if (isChromatic) {
  MockDate.set(new Date("2020-01-01T14:54:10").toString());
}

const cmsContent = {
  content: {
    heroImage:
      "https://cms.casumo.com/wp-content/uploads/2020/12/ggl-pause-break.svg",
    onboardingTitle: "Ready to try Casumo Jackpots?",
    onboardingBodyCopy:
      "You’re about to play a Casumo Jackpots game. Select ‘Play with jackpots’ for a chance to win 1 of 4 progressive jackpots that can drop on any spin. The next jackpot could be yours!",
    onboardingBodyCopy2:
      "By opting-in you agree to contribute 10 cents per round to the total prize pool. T&C apply",
    onboarding_button_label: "Play with jackpots",
    onboarding_deny_button_label: "Play normally",
  },
};

const stories = storiesOf("RSModal/GameLaunch", module);
stories.add("Finished", () => {
  return (
    <GameLaunchOnboardingModal
      config={{ ...cmsContent }}
      acceptModal={action("accepted modal")}
      cancelModal={action("cancel modal")}
    />
  );
});
