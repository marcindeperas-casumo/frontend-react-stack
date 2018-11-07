import { storiesOf } from "@storybook/react";
import React from "react";
import info from "Storybook/storybookInfo";
import CuratedCard from "Components/CuratedCard";
import MockStore from "Components/MockStore";
import defaultState from "Reducers/__mocks__/state.mock";
import curated from "Reducers/curated/__mocks__/curated.json";
import { compose, prop } from "ramda";

const stories = storiesOf("CuratedCard", module);

stories.add(
  "Default",
  () => {
    return (
      <MockStore>
        <div
          className="u-margin-left--auto u-margin-right--auto"
          style={{ maxWidth: "686px" }}
        >
          <CuratedCard />
        </div>
      </MockStore>
    );
  },
  info({ text: "Default" })
);

stories.add(
  "Promotion",
  () => {
    const state = {
      ...defaultState,
      schema: {
        cms: {
          "curated.curated-gb_en": {
            fields: curated,
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
          <CuratedCard />
        </div>
      </MockStore>
    );
  },
  info({ text: "Default" })
);
