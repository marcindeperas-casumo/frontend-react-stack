/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { LiveCasinoCard } from "./LiveCasinoCard";
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
const t = {
  playNowText: "Play now 👻",
  betBehindText: "Bet behind",
  openSeatsText: "Seats left",
};

stories.add("Card MoneyWheel", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={MoneyWheel} t={t} />
    </MockStore>
  </div>
));

stories.add("Card Roulette", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={Roulette} t={t} />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Open Seats", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={Blackjack} t={t} />
    </MockStore>
  </div>
));

stories.add("Card Blackjack Full", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={BlackjackFull} t={t} />
    </MockStore>
  </div>
));

stories.add("Card TopCard (Football)", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={TopCard} t={t} />
    </MockStore>
  </div>
));

stories.add("Card Monopoly", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={Monopoly} t={t} />
    </MockStore>
  </div>
));

stories.add("Card Baccarat", () => (
  <div className="c-live-casino-card">
    <MockStore>
      <LiveCasinoCard game={Baccarat} t={t} />
    </MockStore>
  </div>
));
