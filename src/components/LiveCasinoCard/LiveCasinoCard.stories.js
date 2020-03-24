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
const playNowText = "Play now 👻";
const blackjackText = {
  betBehindText: "Bet behind",
  openSeatsText: "Seats left",
};

stories.add("Card MoneyWheel", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        playNowText={playNowText}
        game={MoneyWheel}
        launchGame={action(MoneyWheel.slug)}
        blackjackText={blackjackText}
      />
    </MockStore>
  </div>
));

stories.add("Card Roulette", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        playNowText={playNowText}
        game={Roulette}
        launchGame={action(Roulette.slug)}
        blackjackText={blackjackText}
      />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Open Seats", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        playNowText={playNowText}
        game={Blackjack}
        launchGame={action(Blackjack.slug)}
        blackjackText={blackjackText}
      />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Full", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        playNowText={playNowText}
        game={BlackjackFull}
        launchGame={action(BlackjackFull.slug)}
        blackjackText={blackjackText}
      />
    </MockStore>
  </div>
));

stories.add("Card TopCard (Football)", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        playNowText={playNowText}
        game={TopCard}
        launchGame={action(TopCard.slug)}
        blackjackText={blackjackText}
      />
    </MockStore>
  </div>
));

stories.add("Card Monopoly", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        playNowText={playNowText}
        game={Monopoly}
        launchGame={action(Monopoly.slug)}
        blackjackText={blackjackText}
      />
    </MockStore>
  </div>
));

stories.add("Card Baccarat", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard
        playNowText={playNowText}
        game={Baccarat}
        launchGame={action(Baccarat.slug)}
        blackjackText={blackjackText}
      />
    </MockStore>
  </div>
));
