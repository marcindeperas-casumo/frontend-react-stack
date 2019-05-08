// @flow
import { storiesOf } from "@storybook/react";
import React from "react";
import { CuratedCard } from "Components/CuratedCard";
import MockStore from "Components/MockStore";
import defaultState from "Models/__mocks__/state.mock";
import curated from "Models/curated/__mocks__/curated.json";
import curatedWelcome from "Models/curated/__mocks__/curated.welcome.json";

const stories = storiesOf("CuratedCard", module);

const state = {
  ...defaultState,
  schema: {
    cms: {
      "curated.curated-gb_en": {
        fields: curated,
      },
      "curated.welcome-offer-test": {
        fields: curatedWelcome,
      },
    },
  },
};

stories.add("Default", () => {
  return (
    <MockStore state={state}>
      <div
        className="u-margin-left--auto u-margin-right--auto"
        style={{ maxWidth: "686px" }}
      >
        <CuratedCard card={"curated-gb_en"} />
      </div>
    </MockStore>
  );
});

stories.add("Promotion", () => {
  return (
    <MockStore>
      <div
        className="u-margin-left--auto u-margin-right--auto"
        style={{ maxWidth: "686px" }}
      >
        <CuratedCard card={"curated-gb_en"} />
      </div>
    </MockStore>
  );
});

stories.add("Welcome offer", () => {
  return (
    <MockStore state={state}>
      <div
        className="u-margin-left--auto u-margin-right--auto"
        style={{ maxWidth: "686px" }}
      >
        <CuratedCard card={"welcome-offer-test"} />
      </div>
    </MockStore>
  );
});
