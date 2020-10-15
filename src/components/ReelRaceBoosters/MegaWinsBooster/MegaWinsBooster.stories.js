// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { MegaWinsBooster } from "./MegaWinsBooster";

const stories = storiesOf("ReelRaceBoosters/MegaWinsBooster", module);
const className = "t-background-grey-90 u-width--5xlg";
const props = {
  className,
};

stories.add("no mega wins", () => {
  return <MegaWinsBooster {...props} megaWins={0} />;
});

stories.add("mega win", () => {
  return <MegaWinsBooster {...props} megaWins={1} />;
});
