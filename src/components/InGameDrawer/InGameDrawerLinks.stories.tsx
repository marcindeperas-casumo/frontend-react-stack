// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { InGameDrawerLinks } from "./InGameDrawerLinks";

const stories = storiesOf("InGameDrawerLinks", module);

const t = {
  in_game_drawer_exit_game: "Exit Game",
  in_game_drawer_live_chat: "Live Chat",
};
const actions = {
  onLiveChatClick: action("Live chat clicked"),
  onExitGameClick: action("Exit game clicked"),
};

stories.add("default", () => {
  return (
    <div className="t-background-grey-90 t-border-r u-padding-x--xlg u-padding-y--lg">
      <InGameDrawerLinks
        isChatDisabled={false}
        onLiveChatClick={actions.onLiveChatClick}
        onExitGameClick={actions.onExitGameClick}
        t={t}
      />
    </div>
  );
});
