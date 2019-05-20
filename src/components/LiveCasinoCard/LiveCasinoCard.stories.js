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
import gameMonopoly from "./__mocks__/Monopoly.json";
import gameBaccarat from "./__mocks__/Baccarat.json";

const stories = storiesOf("LiveCasinoCard", module);

const subscribeToUpdates = () => {};
const unsubscribeFromUpdates = () => {};

if (isNotChromatic) {
  stories.add("Card (connected)", () => (
    <MockStore>
      <LiveCasinoCardConnected id="topwheel-treasures" />
    </MockStore>
  ));
}
stories.add("Card MoneyWheel", () => (
  <MockStore>
    <LiveCasinoCard
      game={gameMoneyWheel}
      launchGame={action(gameMoneyWheel.slug)}
      subscribeToUpdates={subscribeToUpdates}
      unsubscribeFromUpdates={unsubscribeFromUpdates}
    />
  </MockStore>
));

stories.add("Card Roulette", () => (
  <MockStore>
    <LiveCasinoCard
      game={gameRoulette}
      launchGame={action(gameRoulette.slug)}
      subscribeToUpdates={subscribeToUpdates}
      unsubscribeFromUpdates={unsubscribeFromUpdates}
    />
  </MockStore>
));

stories.add("Card Blackjack Open Seats", () => (
  <MockStore>
    <LiveCasinoCard
      game={gameBlackjack}
      launchGame={action(gameBlackjack.slug)}
      subscribeToUpdates={subscribeToUpdates}
      unsubscribeFromUpdates={unsubscribeFromUpdates}
    />
  </MockStore>
));

stories.add("Card Blackjack Full", () => (
  <MockStore>
    <LiveCasinoCard
      game={gameBlackjackFull}
      launchGame={action(gameBlackjackFull.slug)}
      subscribeToUpdates={subscribeToUpdates}
      unsubscribeFromUpdates={unsubscribeFromUpdates}
    />
  </MockStore>
));

stories.add("Card TopCard (Football)", () => (
  <MockStore>
    <LiveCasinoCard
      game={gameTopCard}
      launchGame={action(gameTopCard.slug)}
      subscribeToUpdates={subscribeToUpdates}
      unsubscribeFromUpdates={unsubscribeFromUpdates}
    />
  </MockStore>
));

stories.add("Card Monopoly", () => (
  <MockStore>
    <LiveCasinoCard
      game={gameMonopoly}
      launchGame={action(gameMonopoly.slug)}
      subscribeToUpdates={subscribeToUpdates}
      unsubscribeFromUpdates={unsubscribeFromUpdates}
    />
  </MockStore>
));

stories.add("Card Baccarat", () => (
  <MockStore>
    <LiveCasinoCard
      game={gameBaccarat}
      launchGame={action(gameBaccarat.slug)}
      subscribeToUpdates={subscribeToUpdates}
      unsubscribeFromUpdates={unsubscribeFromUpdates}
    />
  </MockStore>
));
