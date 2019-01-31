// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import roulette from "Components/LiveCasinoCard/__mocks__/Roulette.json";
import moneyWheel from "Components/LiveCasinoCard/__mocks__/MoneyWheel.json";
import LiveCasinoDetailPage from "./LiveCasinoDetailPage";

const data = [
  { id: "roulette", title: "Roulette", gamesInSection: [roulette, roulette] },
  { id: "mw", title: "Money Wheel", gamesInSection: [moneyWheel] },
];

const stories = storiesOf("LiveCasinoDetailPage", module);

stories.add(
  "Default",
  () => <LiveCasinoDetailPage gamesList={data} launchGame={() => {}} />,
  info({ text: "Default" })
);
