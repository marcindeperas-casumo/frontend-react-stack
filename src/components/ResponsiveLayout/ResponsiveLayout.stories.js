// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import isNotChromatic from "Storybook/isNotChromatic";
import { Desktop, Mobile } from "./ResponsiveLayout";

const stories = storiesOf("ResponsiveLayout", module);

if (isNotChromatic) {
  stories.add(
    "Conditional rendering example",
    () => (
      <div>
        <Desktop children={<p>I'm a Desktop device 🖥 </p>} />
        <Mobile children={<p>I'm a Mobile device 📱</p>} />
      </div>
    ),
    info({ text: "Conditional rendering example" })
  );
}

/*
  Desktop and mobile are currently being tested on Chromatic as it is not trivial how to test matchMedia
  via unit-testing https://github.com/Casumo/mobile-react-stack-poc/pull/473#discussion_r281507505
  Ideal scenario would be testing those with Jest and remove the following stories.
*/

stories.add(
  "Desktop",
  () => <Desktop children={<p>I'm a Desktop device 🖥 </p>} />,
  {
    chromatic: { viewports: [768, 1280] },
  }
);

stories.add(
  "Mobile",
  () => <Mobile children={<p>I'm a Mobile device 📱</p>} />,
  {
    chromatic: { viewports: [768, 1280] },
  }
);
