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
      <LiveCasinoCard
        {...gameMoneyWheel}
        launchGame={action(gameMoneyWheel.slug)}
      />
    </div>
  ),
  info({ text: "Card MoneyWheel" })
);

stories.add(
  "Card Roulette",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <LiveCasinoCard
        {...gameRoulette}
        launchGame={action(gameRoulette.slug)}
      />
    </div>
  ),
  info({ text: "Card Roulette" })
);

stories.add(
  "Card Blackjack Open Seats",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <LiveCasinoCard
        {...gameBlackjack}
        launchGame={action(gameBlackjack.slug)}
      />
    </div>
  ),
  info({ text: "Card Blackjack Open Seats" })
);

stories.add(
  "Card Blackjack Full",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <LiveCasinoCard
        {...gameBlackjackFull}
        launchGame={action(gameBlackjackFull.slug)}
      />
    </div>
  ),
  info({ text: "Card Blackjack Full" })
);

stories.add(
  "Card TopCard (Football)",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <LiveCasinoCard {...gameTopCard} launchGame={action(gameTopCard.slug)} />
    </div>
  ),
  info({ text: "Card TopCard (Football)" })
);
