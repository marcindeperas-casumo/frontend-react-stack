/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import isNotChromatic from "Storybook/isNotChromatic";
import LiveCasinoCardConnected from "Components/LiveCasinoCard";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";
import MockStore from "Components/MockStore";
import gameRoulette from "./__mocks__/Roulette.json";
import gameTopCard from "./__mocks__/TopCard.json";
import gameMoneyWheel from "./__mocks__/MoneyWheel.json";
import gameBlackjack from "./__mocks__/Blackjack.json";
import gameBlackjackFull from "./__mocks__/BlackjackFull.json";

const stories = storiesOf("LiveCasinoCard", module);

const subscribeToUpdates = () => {};
const unsubscribeFromUpdates = () => {};

if (isNotChromatic) {
  stories.add("Card (connected)", () => (
    <div style={{ maxWidth: "320px" }}>
      <MockStore>
        <LiveCasinoCardConnected id="topwheel-treasures" />
      </MockStore>
    </div>
  ));
}
stories.add("Card MoneyWheel", () => (
  <div style={{ maxWidth: "320px" }}>
    <MockStore>
      <LiveCasinoCard
        game={gameMoneyWheel}
        launchGame={action(gameMoneyWheel.slug)}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    </MockStore>
  </div>
));

stories.add("Card Roulette", () => (
  <div style={{ maxWidth: "320px" }}>
    <MockStore>
      <LiveCasinoCard
        game={gameRoulette}
        launchGame={action(gameRoulette.slug)}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Open Seats", () => (
  <div style={{ maxWidth: "320px" }}>
    <MockStore>
      <LiveCasinoCard
        game={gameBlackjack}
        launchGame={action(gameBlackjack.slug)}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Full", () => (
  <div style={{ maxWidth: "320px" }}>
    <MockStore>
      <LiveCasinoCard
        game={gameBlackjackFull}
        launchGame={action(gameBlackjackFull.slug)}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    </MockStore>
  </div>
));

stories.add("Card TopCard (Football)", () => (
  <div style={{ maxWidth: "320px" }}>
    <MockStore>
      <LiveCasinoCard
        game={gameTopCard}
        launchGame={action(gameTopCard.slug)}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    </MockStore>
  </div>
));
