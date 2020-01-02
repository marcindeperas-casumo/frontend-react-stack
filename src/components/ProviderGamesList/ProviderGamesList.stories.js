// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import ProviderGamesList from "Components/ProviderGamesList";
import ProviderGamesListPresentational from "Components/ProviderGamesList/ProviderGamesList";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";
import defaultState from "Models/__mocks__/state.mock";
import "./ProviderGamesList.stories.scss";
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
  name: "Nyx",
  slug: "casumo-services-ltd-nyx",
  games,
};

stories.add("ProviderGamesList (Presentational)", () => (
  <MockStore>
    <ProviderGamesListPresentational
      areGamesLoaded={true}
      provider={provider}
      count={games.length}
    />
  </MockStore>
));

if (isNotChromatic) {
  stories.add("ProviderGamesList (Connected)", () => (
    <MockStore state={defaultState}>
      <ProviderGamesList provider={provider.slug} />
    </MockStore>
  ));
}
