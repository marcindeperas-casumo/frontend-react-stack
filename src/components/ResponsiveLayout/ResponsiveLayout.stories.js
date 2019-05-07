// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import isNotChromatic from "Storybook/isNotChromatic";
import { Desktop, Mobile } from "./ResponsiveLayout";

const stories = storiesOf("ResponsiveLayout", module);

/*
  Desktop and mobile are currently being tested on Chromatic as it is not trivial how to test matchMedia
  via unit-testing https://github.com/Casumo/mobile-react-stack-poc/pull/473#discussion_r281507505
  Ideal scenario would be testing those with Jest and remove the following stories.
*/

stories.add(
  "Desktop - 1280px viepwport",
  () => (
    <div>
      <Desktop children={<p>I'm a Desktop device 🖥 </p>} />
      <Mobile
        children={
          <p>I'm a Mobile device 📱and chromatic should NOT see me 👀</p>
        }
      />
    </div>
  ),
  {
    chromatic: { viewports: [1280] },
  }
);

stories.add(
  "Mobile - 768px viewport",
  () => (
    <div>
      <Mobile children={<p>I'm a Mobile device 📱</p>} />
      <Desktop
        children={
          <p>I'm a Desktop device 🖥 and chromatic should NOT see me 👀</p>
        }
      />
    </div>
  ),
  {
    chromatic: { viewports: [768] },
  }
);
