import React from "react";
import { storiesOf } from "@storybook/react";
import { GameRow } from "Components/GameRow";
import MockStore from "Components/MockStore";
import SectionList from "./";

const stories = storiesOf("SectionList", module);

const sections = [
  { title: "D", data: ["dancing-in-rio", "divine-fortune"] },
  { title: "H", data: ["hall-of-gods"] },
  { title: "I", data: ["irish-riches"] },
  { title: "J", data: ["jackpot-diamonds"] },
  { title: "K", data: ["keystone-kops"] },
  {
    title: "M",
    data: [
      "mega-fortune",
      "mega-fortune-dreams",
      "mega-moolah",
      "monkeys-millions",
    ],
  },
  { title: "P", data: ["power-force-heroes"] },
  { title: "T", data: ["top-cat"] },
];

stories.add("Alphabetical", () => (
  <MockStore>
    <SectionList sections={sections} renderItem={id => <GameRow id={id} />} />
  </MockStore>
));

stories.add("Section with no games", () => (
  <MockStore>
    <SectionList
      sections={[
        {
          title: "I'm a section with results",
          data: ["mega-fortune-dreams", "mega-fortune"],
        },
        { title: "I'm an empty section" },
        {
          title: "I'm a section with other results",
          data: ["hall-of-gods", "divine-fortune"],
        },
      ]}
      renderItem={id => <GameRow id={id} />}
    />
  </MockStore>
));
