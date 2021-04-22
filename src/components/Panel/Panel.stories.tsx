import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import * as React from "react";
import { Panel } from "./Panel";

const stories = storiesOf("Panel", module).addParameters({
  noGlobalDecorator: true,
});
const Wrapper = ({ children }) => (
  <div className="bg-grey-0 u-padding--3xlg">{children}</div>
);

stories.add("Default", () => (
  <Wrapper>
    <Panel
      roundedTop={boolean("Rounded Top?", true)}
      roundedBottom={boolean("Rounded Bottom?", true)}
    >
      contents
    </Panel>
  </Wrapper>
));
