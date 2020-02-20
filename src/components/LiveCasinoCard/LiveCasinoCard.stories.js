/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import LiveCasinoCard from "./LiveCasinoCard";
import {
  MoneyWheel,
  Roulette,
  Blackjack,
  BlackjackFull,
  TopCard,
  Monopoly,
  Baccarat,
} from "./__mocks__";

const stories = storiesOf("LiveCasinoCard", module);

stories.add("Card MoneyWheel", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={MoneyWheel} launchGame={action(MoneyWheel.slug)} />
    </MockStore>
  </div>
));

stories.add("Card Roulette", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={Roulette} launchGame={action(Roulette.slug)} />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Open Seats", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={Blackjack} launchGame={action(Blackjack.slug)} />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Full", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        game={BlackjackFull}
        launchGame={action(BlackjackFull.slug)}
      />
    </MockStore>
  </div>
));

stories.add("Card TopCard (Football)", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={TopCard} launchGame={action(TopCard.slug)} />
    </MockStore>
  </div>
));

stories.add("Card Monopoly", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={Monopoly} launchGame={action(Monopoly.slug)} />
    </MockStore>
  </div>
));

stories.add("Card Baccarat", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={Baccarat} launchGame={action(Baccarat.slug)} />
    </MockStore>
  </div>
));
