// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";
import { ReelRacesList } from "./ReelRacesList";
import state from "./__mocks__/reelRacesStore";
const stories = storiesOf("ReelRacesList", module);

const props = {
  isFetched: true,
  fetchReelRaces: () => {},
  fetchTranslations: () => {},
  subscribeReelRacesUpdates: () => {},
  unsubscribeReelRacesUpdates: () => {},
  areTranslationsFetched: true,
  reelRacesIds: [
    "edc71c70-56d6-11e9-8587-0242ac11000b",
    "c21ee900-560d-11e9-8587-0242ac11000b",
    "f05408e0-56d6-11e9-8587-0242ac11000b",
    "c1c1fbf0-560d-11e9-8587-0242ac11000b",
    "c1f9fbe0-560d-11e9-8587-0242ac11000b",
  ],
  t: {
    more_link: "See more",
    spins: "spins",
    duration: "duration",
    duration_template: "duration_template",
    min_bet: "min_bet",
    starting_in: "starting_in",
    ending_in: "ending_in",
    opt_in: "opt_in",
    opted_in: "opted_in",
    opted_in_cta_single_game_short: "opted_in_cta_single_game_short",
    compete_for: "Compete for {{prize}}",
    title: "Reel Races",
    caveat_short: "false",
  },
};

if (isNotChromatic) {
  stories.add("ReelRacesList", () => (
    <MockStore state={state}>
      <ReelRacesList {...props} />
    </MockStore>
  ));
}
