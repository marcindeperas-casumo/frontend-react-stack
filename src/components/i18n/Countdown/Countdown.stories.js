// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import t from "Components/i18n/ISO8601Duration/__mocks__/translations.js";
import { Countdown } from "./Countdown";

const state = {
  schema: {
    cms: {
      "i18n.durations": {
        fields: {
          ...t,
        },
      },
    },
  },
};
const secondsTillEnd = 100000;

const stories = storiesOf("i18n/Countdown", module);
stories.add("Default", () => (
  <MockStore state={state}>
    <Countdown secondsTillEnd={secondsTillEnd} />
  </MockStore>
));
stories.add("preferAbbreviated", () => (
  <MockStore state={state}>
    <Countdown secondsTillEnd={secondsTillEnd} preferAbbreviated />
  </MockStore>
));
stories.add("preferShort", () => (
  <MockStore state={state}>
    <Countdown secondsTillEnd={secondsTillEnd} preferShort />
  </MockStore>
));
