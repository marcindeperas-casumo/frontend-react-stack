import React from "react";
import { storiesOf } from "@storybook/react";
import { GameRow } from "Components/GameRow/GameRow";
import MockStore from "Components/MockStore";
import { games } from "./__mock__";
import SectionList from "./";

const stories = storiesOf("SectionList", module);

const sections = [
  { title: "D", data: [games[0], games[1]] },
  { title: "H", data: [games[2]] },
  { title: "I", data: [games[3]] },
  { title: "J", data: [games[4]] },
  { title: "K", data: [games[5]] },
  {
    title: "M",
    data: [games[6], games[7], games[8]],
  },
  { title: "P", data: [games[9]] },
  { title: "T", data: [games[10]] },
];

stories.add("Alphabetical", () => (
  <MockStore>
    <SectionList
      sections={sections}
      renderItem={game => <GameRow game={game} onLaunchGame={() => {}} />}
    />
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
