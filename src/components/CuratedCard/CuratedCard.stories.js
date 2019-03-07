// @flow
import { storiesOf } from "@storybook/react";
import React from "react";
import info from "Storybook/storybookInfo";
import CuratedCard from "Components/CuratedCard";
import MockStore from "Components/MockStore";
import defaultState from "Models/__mocks__/state.mock";
import curated from "Models/curated/__mocks__/curated.json";
import curatedWelcome from "Models/curated/__mocks__/curated.welcome.json";

const stories = storiesOf("CuratedCard", module);

stories.add(
  "Default",
  () => {
    const state = {
      ...defaultState,
      schema: {
        cms: {
          "curated.curated-gb_en": {
            fields: curated,
          },
          "wecome-offer-test": {
            fields: curatedWelcome,
          },
        },
      },
    };

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
  },
  info({ text: "Default" })
);

stories.add(
  "Promotion",
  () => {
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
  },
  info({ text: "Default" })
);

stories.add("Welcome offer", () => {
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
