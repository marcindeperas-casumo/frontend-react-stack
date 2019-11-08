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
    <div className="c-live-casino-card">
      <MockStore>
        <LiveCasinoCardConnected id="topwheel-treasures" />
      </MockStore>
    </div>
  ));
}

stories.add("Card MoneyWheel", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameMoneyWheel}
        onFavouriteGame={action("onFavouriteGame")}
        launchGame={action(gameMoneyWheel.slug)}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    </MockStore>
  </div>
));

stories.add("Card Roulette", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameRoulette}
        onFavouriteGame={action("onFavouriteGame")}
        launchGame={action(gameRoulette.slug)}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Open Seats", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameBlackjack}
        onFavouriteGame={action("onFavouriteGame")}
        launchGame={action(gameBlackjack.slug)}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Full", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameBlackjackFull}
        onFavouriteGame={action("onFavouriteGame")}
        launchGame={action(gameBlackjackFull.slug)}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    </MockStore>
  </div>
));

stories.add("Card TopCard (Football)", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameTopCard}
        onFavouriteGame={action("onFavouriteGame")}
        launchGame={action(gameTopCard.slug)}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    </MockStore>
  </div>
));

stories.add("Card Monopoly", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameMonopoly}
        onFavouriteGame={action("onFavouriteGame")}
        launchGame={action(gameMonopoly.slug)}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    </MockStore>
  </div>
));

stories.add("Card Baccarat", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameBaccarat}
        onFavouriteGame={action("onFavouriteGame")}
        launchGame={action(gameBaccarat.slug)}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    </MockStore>
  </div>
));
