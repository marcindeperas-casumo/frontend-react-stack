// @flow
import React from "react";
import { find, propEq } from "ramda";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import { VALUABLE_TYPES } from "Models/valuables";
import mockData from "./__mocks__/Valuable.json";
import ValuableCard from "./";

const stories = storiesOf("ValuableCard", module);

stories.add(
  "Default",
  () => {
    const valuableType =
      select("Valuable Type", VALUABLE_TYPES, VALUABLE_TYPES.SPINS) ||
      VALUABLE_TYPES.CASH;
    const valuableDetails =
      find(propEq("valuableType", valuableType))(mockData) || mockData[0];

    return <ValuableCard {...valuableDetails} />;
  },
  info({ text: "Default" })
);
