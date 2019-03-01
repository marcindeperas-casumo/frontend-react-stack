// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import isNotChromatic from "Storybook/isNotChromatic";
import MockStore from "Components/MockStore";
import LiveCasinoDetailPageConnected from ".";

if (isNotChromatic) {
  const stories = storiesOf("LiveCasinoDetailPage", module);
  // this component is using GameRow inside, it will not work without connected store
  stories.add(
    "Default (Connected)",
    () => (
      <MockStore>
        <LiveCasinoDetailPageConnected />
      </MockStore>
    ),
    info({ text: "Default" })
  );
}
