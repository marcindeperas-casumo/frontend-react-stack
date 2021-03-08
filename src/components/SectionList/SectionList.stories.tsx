import { storiesOf } from "@storybook/react";
import React from "react";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowText } from "Components/GameRow/GameRowText";
import MockStore from "Components/MockStore";
import { sections } from "./__mock__";
import SectionList from "./";

const stories = storiesOf("SectionList", module);

const renderItem = game => (
  <GameRow
    game={game}
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ game: any; onLaunchGame: () => void; rende... Remove this comment to see the full error message
    onLaunchGame={() => {}}
    renderText={() => <GameRowText name={game.name} />}
  />
);

stories.add("Alphabetical", () => (
  <MockStore>
    {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
    <SectionList sections={sections} renderItem={renderItem} />
  </MockStore>
));

stories.add("Section with no games", () => (
  <MockStore>
    <SectionList
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      sections={[sections[0], { title: "I'm an empty section" }, sections[1]]}
      renderItem={renderItem}
    />
  </MockStore>
));
