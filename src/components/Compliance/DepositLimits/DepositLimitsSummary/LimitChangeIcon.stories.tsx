import { storiesOf } from "@storybook/react";
import Flex from "@casumo/cmp-flex";
import * as React from "react";
import { LimitChangeIcon } from "./LimitChangeIcon";

const stories = storiesOf(
  "DepositLimits/DepositLimitsSummary/LimitChangeIcon",
  module
);

// Purpose of this is to make sure that all possible states take always the same amount of space
stories.add("Default", () => (
  <Flex direction="horizontal" justify="space-between" style={{ width: 180 }}>
    {["unchanged", "increase", "decrease", "removed"].map(x => (
      <div
        key={x}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; key: string; justify: s... Remove this comment to see the full error message
        justify="center"
        align="center"
        style={{ backgroundColor: "#ffcd32" }}
      >
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'LimitChan... Remove this comment to see the full error message */}
        <LimitChangeIcon change={x} />
      </div>
    ))}
  </Flex>
));
