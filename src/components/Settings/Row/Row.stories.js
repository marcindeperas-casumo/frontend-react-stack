// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Link from "Components/Settings/Link";
import Row from "./";

const stories = storiesOf("Settings/Row", module);

stories.add("Default", () => (
  <Row
    text="a label"
    action={<Link label="Go to home" target="http://www.casumo.com" />}
  />
));
