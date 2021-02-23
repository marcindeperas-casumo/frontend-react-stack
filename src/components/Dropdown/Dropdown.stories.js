// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Dropdown, DropdownItem } from "./Dropdown";

const stories = storiesOf("Dropdown", module).addParameters({
  noGlobalDecorator: true,
});
const Wrapper = ({ children }) => (
  <div className="t-background-grey-0 u-padding--3xlg">{children}</div>
);

stories.add("Default", () => (
  <Wrapper>
    <Dropdown label="Open Dropdown">
      <DropdownItem withBottomBorder>One</DropdownItem>
      <DropdownItem>Two</DropdownItem>
      <DropdownItem>Three</DropdownItem>
    </Dropdown>
  </Wrapper>
));
