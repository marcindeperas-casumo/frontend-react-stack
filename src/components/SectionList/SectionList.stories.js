import React from "react";
import { storiesOf } from "@storybook/react";
import { GameRow } from "Components/GameRow/GameRow";
import MockStore from "Components/MockStore";
import { sections } from "./__mock__";
import SectionList from "./";

const stories = storiesOf("SectionList", module);

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
      sections={[sections[0], { title: "I'm an empty section" }, sections[1]]}
      renderItem={game => <GameRow game={game} onLaunchGame={() => {}} />}
    />
  </MockStore>
));
