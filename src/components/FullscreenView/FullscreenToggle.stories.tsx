import { storiesOf } from "@storybook/react";
import React from "react";
import { FullscreenView } from "./FullscreenView";
import { FullscreenToggle } from "./FullscreenToggle";

const stories = storiesOf("FullscreenToggle", module);

stories.add("Default", () => {
  return (
    <FullscreenView className="t-background-white">
      <FullscreenToggle />
    </FullscreenView>
  );
});
