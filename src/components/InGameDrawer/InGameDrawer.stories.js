// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { InGameDrawer } from "./InGameDrawer";

const stories = storiesOf("InGameDrawer", module);
const cmsLabels = {
  in_game_drawer_live_chat: "Live chat",
  in_game_drawer_exit_game: "Exit game",
};

stories.add("Default", () => {
  return (
    <InGameDrawer
      t={cmsLabels}
      isChatDisabled={false}
      onLiveChatClick={action("clicked live chat button")}
      onExitGameClick={action("clicked exit game button")}
    />
  );
});
stories.add("Chat disabled", () => {
  return (
    <InGameDrawer
      t={cmsLabels}
      isChatDisabled={true}
      onLiveChatClick={action("clicked live chat button")}
      onExitGameClick={action("clicked exit game button")}
    />
  );
});
