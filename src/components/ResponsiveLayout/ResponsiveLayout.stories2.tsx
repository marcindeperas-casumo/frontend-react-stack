import { storiesOf } from "@storybook/react";
import React from "react";
import { viewports } from "Storybook/viewports";
import { Desktop, MobileAndTablet } from "./ResponsiveLayout";

const stories = storiesOf("ResponsiveLayout", module);

/*
  Desktop and mobile are currently being tested on Chromatic as it is not trivial how to test matchMedia
  via unit-testing https://github.com/Casumo/frontend-react-stack/pull/473#discussion_r281507505
  Ideal scenario would be testing those with Jest and remove the following stories.
*/

stories.add(
  "Desktop - 1280px viewport",
  () => (
    <div>
      <Desktop>
        <p>
          I'm a Desktop device
          <span role="img" aria-label="desktop">
            🖥
          </span>
        </p>
      </Desktop>
      <MobileAndTablet>
        <p>
          I'm a Mobile device
          <span role="img" aria-label="mobile">
            📱
          </span>
          and chromatic should NOT see me
          <span role="img" aria-label="eyes">
            👀
          </span>
        </p>
      </MobileAndTablet>
    </div>
  ),
  viewports.desktop
);

stories.add(
  "MobileAndTablet - 768px viewport",
  () => (
    <div>
      <MobileAndTablet>
        <p>
          I'm a Mobile device
          <span role="img" aria-label="mobile">
            📱
          </span>
        </p>
      </MobileAndTablet>
      <Desktop>
        <p>
          I'm a Desktop device
          <span role="img" aria-label="desktop">
            🖥
          </span>
          and chromatic should NOT see me
          <span role="img" aria-label="eyes">
            👀
          </span>
        </p>
      </Desktop>
    </div>
  ),
  viewports.tablet
);
