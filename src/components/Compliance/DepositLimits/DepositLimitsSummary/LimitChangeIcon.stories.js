// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import Flex from "@casumo/cmp-flex";
import { LimitChangeIcon } from "./LimitChangeIcon";

const stories = storiesOf("DepositLimitsSummary/LimitChangeIcon", module);

// Purpose of this is to make sure that all possible states take always the same amount of space
stories.add("Default", () => (
  <Flex direction="horizontal" justify="space-between" style={{ width: 180 }}>
    {["unchanged", "increase", "decrease", "removed"].map(x => (
      <div
        justify="center"
        align="center"
        style={{ backgroundColor: "#ffcd32" }}
      >
        <LimitChangeIcon change={x} />
      </div>
    ))}
  </Flex>
));
