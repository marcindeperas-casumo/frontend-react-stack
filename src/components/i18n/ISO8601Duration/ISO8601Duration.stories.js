// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import t from "./__mocks__/translations.js";
import { ISO8601Duration } from "./ISO8601Duration";

const stories = storiesOf("i18n/ISO8601Duration", module);
stories.add("Default", () => (
  <div>
    <ISO8601Duration
      duration="P1Y1M1DT1H1M1.001S"
      t={t}
      fetchTranslations={() => {}}
    />
    <br />
    <ISO8601Duration
      duration="P2Y2M2DT2H2M2.002S"
      t={t}
      fetchTranslations={() => {}}
    />
  </div>
));
