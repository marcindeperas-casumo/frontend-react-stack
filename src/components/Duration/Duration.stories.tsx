// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs/react";
import MockStore from "Components/MockStore";
import stateMock from "./__mocks__/state";
import { Duration } from "./Duration";

const stories = storiesOf("Duration", module);

stories.add("Default", () => (
  <MockStore state={stateMock}>
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
  </MockStore>
));
