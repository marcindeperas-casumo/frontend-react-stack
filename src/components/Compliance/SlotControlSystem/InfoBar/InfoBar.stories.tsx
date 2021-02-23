// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockDate from "mockdate";
import { isChromatic } from "Storybook/isNotChromatic";
import { InfoBar } from "./InfoBar";

const stories = storiesOf("Compliance/SlotControlSystem", module);
if (isChromatic) {
  MockDate.set(new Date("2020-01-01T00:00:00").toString());
}
stories.add("InfoBar", () => <InfoBar />);
