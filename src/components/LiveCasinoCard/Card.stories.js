/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "../../../.storybook/storybookInfo";
import isNotChromatic from "../../../.storybook/isNotChromatic";

import LiveCasinoCard from "Components/LiveCasinoCard/Card";

import gameRoulette from "./__mocks__/Roulette.json";
import gameTopCard from "./__mocks__/TopCard.json";
import gameMoneyWheel from "./__mocks__/MoneyWheel.json";
import gameBlackjack from "./__mocks__/Blackjack.json";
import gameBlackjackFull from "./__mocks__/BlackjackFull.json";
import MockStore from "Components/MockStore";

const stories = storiesOf("Card", module);

if (isNotChromatic) {
  stories.add(
    "Card MoneyWheel",
    () => (
      <MockStore>
        <div style={{ maxWidth: "320px" }}>
          <LiveCasinoCard {...gameMoneyWheel} />
        </div>
      </MockStore>
    ),
    info({ text: "Card MoneyWheel" })
  );

  stories.add(
    "Card Roulette",
    () => (
      <MockStore>
        <div style={{ maxWidth: "320px" }}>
          <LiveCasinoCard {...gameRoulette} />
        </div>
      </MockStore>
    ),
    info({ text: "Card Roulette" })
  );

  stories.add(
    "Card Blackjack Open Seats",
    () => (
      <MockStore>
        <div style={{ maxWidth: "320px" }}>
          <LiveCasinoCard {...gameBlackjack} />
        </div>
      </MockStore>
    ),
    info({ text: "Card Blackjack Open Seats" })
  );

  stories.add(
    "Card Blackjack Full",
    () => (
      <MockStore>
        <div style={{ maxWidth: "320px" }}>
          <LiveCasinoCard {...gameBlackjackFull} />
        </div>
      </MockStore>
    ),
    info({ text: "Card Blackjack Full" })
  );

  stories.add(
    "Card TopCard (Football)",
    () => (
      <MockStore>
        <div style={{ maxWidth: "320px" }}>
          <LiveCasinoCard {...gameTopCard} />
        </div>
      </MockStore>
    ),
    info({ text: "Card TopCard (Football)" })
  );
}
