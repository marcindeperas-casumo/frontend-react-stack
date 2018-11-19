import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MockStore from "Components/MockStore";
import MustDropJackpots from "Components/MustDropJackpots/MustDropJackpots";

const stories = storiesOf("MustDropJackpots", module);

const MustDropJackpotsStories = () => (
  <MockStore>
    <MustDropJackpots
      ids={[
        "mega-fortune-dreams",
        "mega-fortune",
        "hall-of-gods",
        "mega-moolah",
        "divine-fortune",
        "dancing-in-rio",
        "irish-riches",
        "top-cat",
        "power-force-heroes",
        "monkeys-millions",
        "keystone-kops",
        "jackpot-diamonds",
      ]}
      isLoaded={true}
      title="🐯 I'm a pretty title bae 🦁"
    />
  </MockStore>
);

stories.add(
  "MustDropJackpots",
  MustDropJackpotsStories,
  info({ text: "Displays the must drop jackpots" })
);
