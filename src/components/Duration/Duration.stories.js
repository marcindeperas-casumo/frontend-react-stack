// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs/react";
import t from "./__mocks__/translations.js";
import { Duration } from "./Duration";

const stories = storiesOf("Duration", module);
stories.add("Default", () => (
  <div>
    <Duration
      duration="P1Y1M1DT1H1M1.001S"
      t={t}
      fetchTranslations={() => {}}
      preferShort={boolean("preferShort", false)}
      preferAbbreviated={boolean("preferAbbreviated", false)}
    />
    <br />
    <Duration
      duration="P2Y2M2DT2H2M2.002S"
      t={t}
      fetchTranslations={() => {}}
      preferShort={boolean("preferShort", false)}
      preferAbbreviated={boolean("preferAbbreviated", false)}
    />
  </div>
));
