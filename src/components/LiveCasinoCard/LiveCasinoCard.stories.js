/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import LiveCasinoCardConnected from "Components/LiveCasinoCard";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";
import MockStore from "Components/MockStore";
import gameRoulette from "./__mocks__/Roulette.json";
import gameTopCard from "./__mocks__/TopCard.json";
import gameMoneyWheel from "./__mocks__/MoneyWheel.json";
import gameBlackjack from "./__mocks__/Blackjack.json";
import gameBlackjackFull from "./__mocks__/BlackjackFull.json";

const stories = storiesOf("LiveCasinoCard", module);

stories.add(
  "Card (connected)",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <MockStore>
        <LiveCasinoCardConnected id="topwheel-treasures" />
      </MockStore>
    </div>
  ),
  info({ text: "Card (connected)" })
);

stories.add(
  "Card MoneyWheel",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <MockStore>
        <LiveCasinoCard game={gameMoneyWheel} />
      </MockStore>
    </div>
  ),
  info({ text: "Card MoneyWheel" })
);

stories.add(
  "Card Roulette",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <MockStore>
        <LiveCasinoCard game={gameRoulette} />
      </MockStore>
    </div>
  ),
  info({ text: "Card Roulette" })
);

stories.add(
  "Card Blackjack Open Seats",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <MockStore>
        <LiveCasinoCard game={gameBlackjack} />
      </MockStore>
    </div>
  ),
  info({ text: "Card Blackjack Open Seats" })
);

stories.add(
  "Card Blackjack Full",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <MockStore>
        <LiveCasinoCard game={gameBlackjackFull} />
      </MockStore>
    </div>
  ),
  info({ text: "Card Blackjack Full" })
);

stories.add(
  "Card TopCard (Football)",
  () => (
    <div style={{ maxWidth: "320px" }}>
      <MockStore>
        <LiveCasinoCard game={gameTopCard} />
      </MockStore>
    </div>
  ),
  info({ text: "Card TopCard (Football)" })
);
