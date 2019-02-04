// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import isNotChromatic from "Storybook/isNotChromatic";
import MockStore from "Components/MockStore";
import roulette from "Components/LiveCasinoCard/__mocks__/Roulette.json";
import moneyWheel from "Components/LiveCasinoCard/__mocks__/MoneyWheel.json";
import LiveCasinoDetailPage from "./LiveCasinoDetailPage";
import LiveCasinoDetailPageConnected from ".";

const data = [
  { id: "roulette", title: "Roulette", gamesInSection: [roulette, roulette] },
  { id: "mw", title: "Money Wheel", gamesInSection: [moneyWheel] },
];

const stories = storiesOf("LiveCasinoDetailPage", module);

if (isNotChromatic) {
  stories.add(
    "Default (Connected)",
    () => (
      <MockStore>
        <LiveCasinoDetailPageConnected />
      </MockStore>
    ),
    info({ text: "Default" })
  );
}

stories.add(
  "Default",
  () => (
    <LiveCasinoDetailPage
      gamesList={data}
      isFetched
      launchGame={() => {}}
      fetchPageBySlug={() => {}}
    />
  ),
  info({ text: "Default" })
);
