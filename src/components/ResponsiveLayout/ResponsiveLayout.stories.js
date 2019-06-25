// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { viewports } from "Storybook/viewports";
import { Desktop, Mobile } from "./ResponsiveLayout";

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
      <Desktop
        children={
          <p>
            I'm a Desktop device
            <span role="img" aria-label="desktop">
              🖥
            </span>
          </p>
        }
      />
      <Mobile
        children={
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
        }
      />
    </div>
  ),
  viewports.desktop
);

stories.add(
  "Mobile - 768px viewport",
  () => (
    <div>
      <Mobile
        children={
          <p>
            I'm a Mobile device
            <span role="img" aria-label="mobile">
              📱
            </span>
          </p>
        }
      />
      <Desktop
        children={
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
        }
      />
    </div>
  ),
  viewports.tablet
);
