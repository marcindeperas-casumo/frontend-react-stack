// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import ProviderGamesList from "Components/ProviderGamesList";
import ProviderGamesListPresentational from "Components/ProviderGamesList/ProviderGamesList";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";
import defaultState from "Models/__mocks__/state.mock";
const stories = storiesOf("ProviderGamesList", module);

const games = [
  "bloodsuckers",
  "easter-island",
  "starburst",
  "bakers-treat",
  "rapunzels-tower",
  "big-bad-wolf",
  "book-of-ra-deluxe",
  "diamond-mine",
];
const provider = {
  inMaintenance: false,
  name: "nyx",
  slug: "casumo-services-ltd-nyx",
  games,
};

stories.add(
  "ProviderGamesList (Presentational)",
  () => (
    <MockStore state={{ game: defaultState.schema.game }}>
      <ProviderGamesListPresentational
        areGamesLoaded={true}
        provider={provider}
      />
    </MockStore>
  ),
  info({ text: "Default" })
);

if (isNotChromatic) {
  stories.add(
    "ProviderGamesList (Connected)",
    () => (
      <MockStore state={defaultState}>
        <ProviderGamesList provider={provider.slug} />
      </MockStore>
    ),
    info({ text: "" })
  );
}
