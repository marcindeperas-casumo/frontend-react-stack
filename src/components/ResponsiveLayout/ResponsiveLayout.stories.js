// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import isNotChromatic from "Storybook/isNotChromatic";
import { RenderIfDesktop, RenderIfMobile } from "./ResponsiveLayout";

const stories = storiesOf("ResponsiveLayout", module);

if (isNotChromatic) {
  stories.add(
    "Default",
    () => (
      <div>
        <RenderIfDesktop children={<p>I'm a Desktop device 🖥 </p>} />
        <RenderIfMobile children={<p>I'm a Mobile device 📱</p>} />
      </div>
    ),
    info({ text: "Default" })
  );
}
