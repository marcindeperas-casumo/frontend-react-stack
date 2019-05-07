// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import isNotChromatic from "Storybook/isNotChromatic";
import { Desktop, Mobile } from "./ResponsiveLayout";

const stories = storiesOf("ResponsiveLayout", module);

if (isNotChromatic) {
  stories.add(
    "Default",
    () => (
      <div>
        <Desktop children={<p>I'm a Desktop device 🖥 </p>} />
        <Mobile children={<p>I'm a Mobile device 📱</p>} />
      </div>
    ),
    info({ text: "Default" })
  );
}
