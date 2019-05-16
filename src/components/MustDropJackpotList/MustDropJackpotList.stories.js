// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import MustDropJackpotList from "Components/MustDropJackpotList/MustDropJackpotList";

const stories = storiesOf("MustDropJackpotList", module);

const MustDropJackpotListStories = () => (
  <MockStore>
    <MustDropJackpotList
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
      areGamesLoaded={true}
      initFetchTopLists={() => {}}
    />
  </MockStore>
);

stories.add("MustDropJackpotList", MustDropJackpotListStories);
