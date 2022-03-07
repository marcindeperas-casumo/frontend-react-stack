import { storiesOf } from "@storybook/react";
import MockDate from "mockdate";
import * as React from "react";
import { isChromatic } from "Storybook/isNotChromatic";
import { ExcludedGameModal } from "./ExcludedGameModal";

if (isChromatic) {
  MockDate.set(new Date("2020-01-01T14:54:10").toString());
}

const cmsContent = {
  redirect_button_text: "Update Limits",
  button_redirect: "/",
  play_okay_logo:
    "https://cms.casumo.com/wp-content/uploads/2021/12/Foreground.png",
  excluded_game_text:
    "You are currently blocked from playing this type of game. If you want, you can update your limits in your Play Okay settings.",
  excluded_game_text_title: "You have this Game Type blocked",
};

const stories = storiesOf("RSModal/GameLaunch", module);
stories.add("ExcludedGame", () => {
  return (
    <ExcludedGameModal
      t={cmsContent}
      config={{ slug: "casumo-jackpots" }}
      closeModal={() => {}}
      onClick={() => {}}
    />
  );
});
