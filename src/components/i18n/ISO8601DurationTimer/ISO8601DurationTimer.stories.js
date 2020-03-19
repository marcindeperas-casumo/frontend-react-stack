// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import t from "Components/i18n/ISO8601Duration/__mocks__/translations.js";
import { ISO8601DurationTimer } from "./ISO8601DurationTimer";

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
const secondsTillEnd = 10;

const stories = storiesOf("i18n/ISO8601DurationTimer", module);
stories.add("Default", () => (
  <MockStore state={state}>
    <ISO8601DurationTimer secondsTillEnd={secondsTillEnd} />
  </MockStore>
));
stories.add("preferAbbreviated", () => (
  <MockStore state={state}>
    <ISO8601DurationTimer secondsTillEnd={secondsTillEnd} preferAbbreviated />
  </MockStore>
));
stories.add("preferShort", () => (
  <MockStore state={state}>
    <ISO8601DurationTimer secondsTillEnd={secondsTillEnd} preferShort />
  </MockStore>
));
