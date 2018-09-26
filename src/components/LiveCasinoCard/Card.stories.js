/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "../../../.storybook/storybookInfo";

import LiveCasinoCard from "Components/LiveCasinoCard/Card";

import gameRoulette from "./__mocks__/Roulette.json";
import gameTopCard from "./__mocks__/TopCard.json";
import gameMoneyWheel from "./__mocks__/MoneyWheel.json";
import gameBlackjack from "./__mocks__/Blackjack.json";
import gameBlackjackFull from "./__mocks__/BlackjackFull.json";

const stories = storiesOf("Card", module);

stories.add(
  "Card MoneyWheel",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <LiveCasinoCard game={gameMoneyWheel} />
    </div>
  ),
  info({ text: "Card MoneyWheel" })
);

stories.add(
  "Card Roulette",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <LiveCasinoCard game={gameRoulette} />
    </div>
  ),
  info({ text: "Card Roulette" })
);

stories.add(
  "Card Blackjack Open Seats",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <LiveCasinoCard game={gameBlackjack} />
    </div>
  ),
  info({ text: "Card Blackjack Open Seats" })
);

stories.add(
  "Card Blackjack Full",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <LiveCasinoCard game={gameBlackjackFull} />
    </div>
  ),
  info({ text: "Card Blackjack Full" })
);

stories.add(
  "Card TopCard (Football)",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <LiveCasinoCard game={gameTopCard} />
    </div>
  ),
  info({ text: "Card TopCard (Football)" })
);
