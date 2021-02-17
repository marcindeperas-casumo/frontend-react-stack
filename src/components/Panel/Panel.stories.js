// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs/react";
import { Panel } from "./Panel";

const stories = storiesOf("Panel", module).addParameters({
  noGlobalDecorator: true,
});
const Wrapper = ({ children }) => (
  <div className="t-background-grey-0 u-padding--3xlg">{children}</div>
);

stories.add("Default", () => (
  <Wrapper>
    <Panel
      roundedTop={boolean("Rounded Top?", false)}
      roundedBottom={boolean("Rounded Bottom?", false)}
    >
      contents
    </Panel>
  </Wrapper>
));
