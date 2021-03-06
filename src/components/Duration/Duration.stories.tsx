import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import * as React from "react";
import { Duration } from "./Duration";

const stories = storiesOf("Duration", module);

stories.add("Default", () => (
  <div>
    <Duration
      duration="P1Y1M1DT1H1M1.001S"
      preferShort={boolean("preferShort", false)}
      preferAbbreviated={boolean("preferAbbreviated", false)}
    />
    <br />
    <Duration
      duration="P2Y2M2DT2H2M2.002S"
      preferShort={boolean("preferShort", false)}
      preferAbbreviated={boolean("preferAbbreviated", false)}
    />
  </div>
));
