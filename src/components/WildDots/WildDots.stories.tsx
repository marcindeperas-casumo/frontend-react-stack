// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
import Flex from "@casumo/cmp-flex";
import { WildDots } from "./WildDots";

storiesOf("WildDots", module).add("Default", () => (
  <Flex style={{ width: 400, flexWrap: "wrap" }}>
    <WildDots
      activeDotIndex={number("Active dot index", 3, {
        range: true,
        min: 0,
        max: 100,
        step: 1,
      })}
      numberOfDots={number("Number of dots", 7, {
        range: true,
        min: 1,
        max: 100,
        step: 1,
      })}
    />
  </Flex>
));
