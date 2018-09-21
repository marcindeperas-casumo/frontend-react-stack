/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { action } from "@storybook/addon-actions";

import LiveCasinoCard from "Components/LiveCasinoCard/Card";

import gameRoulette from "./__mocks__/Roulette.json";
import gameTopCard from "./__mocks__/TopCard.json";
import gameMoneyWheel from "./__mocks__/MoneyWheel.json";
import gameBlackjack from "./__mocks__/Blackjack.json";
import gameBlackjackFull from "./__mocks__/BlackjackFull.json";

const stories = storiesOf("Card", module);

stories.add(
  "Card MoneyWheel",
  withInfo("Card")(() => <LiveCasinoCard {...gameMoneyWheel} />)
);

stories.add(
  "Card Roulette",
  withInfo("Card")(() => <LiveCasinoCard {...gameRoulette} />)
);

stories.add(
  "Card Blackjack Open Seats",
  withInfo("Card")(() => <LiveCasinoCard {...gameBlackjack} />)
);

stories.add(
  "Card Blackjack Full",
  withInfo("Card")(() => <LiveCasinoCard {...gameBlackjackFull} />)
);

stories.add(
  "Card TopCard (Football)",
  withInfo("Card")(() => <LiveCasinoCard {...gameTopCard} />)
);
