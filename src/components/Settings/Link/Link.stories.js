// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Link from "./";

const stories = storiesOf("Settings/Link", module);

stories.add("Triggers a function", () => (
  <Link
    label="Console.log something"
    launcher={console.log} //eslint-disable-line no-console
    target={"hello world"}
  />
));

stories.add("Regular Href", () => (
  <Link label="Casumo.com" target="http://www.casumo.com" />
));
