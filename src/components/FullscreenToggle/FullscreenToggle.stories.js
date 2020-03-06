// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { FullscreenToggle } from "./FullscreenToggle";

const stories = storiesOf("FullscreenToggle", module);

stories.add("Default", () => {
  const target = document.body;

  return (
    <div style={{ background: "white" }}>
      <FullscreenToggle element={target} />
    </div>
  );
});
