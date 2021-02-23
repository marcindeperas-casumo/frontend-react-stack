// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockDate from "mockdate";
import { isChromatic } from "Storybook/isNotChromatic";
import MockStore from "Components/MockStore";
import { slug } from "Models/reelRaces";
import { ReelRaceWidget } from "./ReelRaceWidget";
import { getReelRaceWidgetQueryMock } from "./__mocks__/ReelRaceWidgetQuery.mock";

const stories = storiesOf("ReelRaceWidget", module);

if (isChromatic) {
  MockDate.set(new Date().toString());
}

const store = {
  schema: {
    cms: {
      [slug]: {
        slug,
        fields: {
          spins: "Spins",
          duration: "Duration",
          duration_template: "{{{duration}}} min",
          min_bet: "Min Bet",
          starting_in: "Starting in",
          ending_in: "Ending in",
          opt_in: "Opt In",
          opted_in: "Opted In",
          opted_in_cta_single_game_short: "Play",
          compete_for: "Compete for {{prize}}",
          title: "Reel Races",
          caveat_short: "false",
        },
      },
    },
  },
};

stories.add("Default", () => {
  return (
    <MockStore state={store} queryMocks={[getReelRaceWidgetQueryMock()]}>
      <div style={{ width: "300px" }}>
        <ReelRaceWidget />
      </div>
    </MockStore>
  );
});
