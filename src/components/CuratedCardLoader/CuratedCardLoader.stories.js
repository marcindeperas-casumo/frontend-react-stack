import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import CuratedCardLoader from "Components/CuratedCardLoader/CuratedCardLoader";
import CuratedCardLoaderContainer from "Components/CuratedCardLoader";
import defaultState from "Models/__mocks__/state.mock";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";
import curatedWelcome from "Models/curated/__mocks__/curated.welcome.json";

const stories = storiesOf("CuratedCardLoader", module);

stories.add(
  "Default",
  () => {
    return (
      <MockStore>
        <div
          className="u-margin-left--auto u-margin-right--auto"
          style={{ maxWidth: "686px" }}
        >
          <CuratedCardLoader
            defaultCardSlug={"curated-gb_en"}
            hasMadeFirstDeposit={true}
          />
        </div>
      </MockStore>
    );
  },
  info({ text: "Default" })
);

stories.add(
  "No deposit made",
  () => {
    const state = {
      ...defaultState,
      schema: {
        cms: {
          "curated.welcome-offer-test": {
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
          <CuratedCardLoader
            defaultCardSlug={"curated-gb_en"}
            hasMadeFirstDeposit={false}
          />
        </div>
      </MockStore>
    );
  },
  info({ text: "Default" })
);

if (isNotChromatic) {
  stories.add(
    "Default (Connected)",
    () => {
      return (
        <MockStore>
          <div
            className="u-margin-left--auto u-margin-right--auto"
            style={{ maxWidth: "686px" }}
          >
            <CuratedCardLoaderContainer card={"curated-gb_en"} />
          </div>
        </MockStore>
      );
    },
    info({ text: "Default" })
  );
}
