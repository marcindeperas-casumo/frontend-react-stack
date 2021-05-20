import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import MockStore from "Components/MockStore";
import { SportsJackpots } from "Features/sports/components/SportsJackpots";

const stories = storiesOf("Sports/SportsJackpots", module);

stories.add("Sports jackpots (desktop)", () => (
  <div className="c-sports-shell--site">
    <MockStore>
      <MockedProvider mocks={[]} addTypename={false}>
        <SportsJackpots />
      </MockedProvider>
    </MockStore>
  </div>
));
