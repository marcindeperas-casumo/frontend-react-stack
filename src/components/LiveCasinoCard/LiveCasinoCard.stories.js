/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import LiveCasinoCard from "./LiveCasinoCard";
import gameRoulette from "./__mocks__/Roulette.json";
import gameTopCard from "./__mocks__/TopCard.json";
import gameMoneyWheel from "./__mocks__/MoneyWheel.json";
import gameBlackjack from "./__mocks__/Blackjack.json";
import gameBlackjackFull from "./__mocks__/BlackjackFull.json";
import gameMonopoly from "./__mocks__/Monopoly.json";
import gameBaccarat from "./__mocks__/Baccarat.json";

const stories = storiesOf("LiveCasinoCard", module);

stories.add("Card MoneyWheel", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameMoneyWheel}
        launchGame={action(gameMoneyWheel.slug)}
      />
    </MockStore>
  </div>
));

stories.add("Card Roulette", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameRoulette}
        launchGame={action(gameRoulette.slug)}
      />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Open Seats", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameBlackjack}
        launchGame={action(gameBlackjack.slug)}
      />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Full", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameBlackjackFull}
        launchGame={action(gameBlackjackFull.slug)}
      />
    </MockStore>
  </div>
));

stories.add("Card TopCard (Football)", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameTopCard}
        launchGame={action(gameTopCard.slug)}
      />
    </MockStore>
  </div>
));

stories.add("Card Monopoly", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameMonopoly}
        launchGame={action(gameMonopoly.slug)}
      />
    </MockStore>
  </div>
));

stories.add("Card Baccarat", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={gameBaccarat}
        launchGame={action(gameBaccarat.slug)}
      />
    </MockStore>
  </div>
));
