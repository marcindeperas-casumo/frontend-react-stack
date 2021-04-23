import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, withKnobs } from "@storybook/addon-knobs";
import React from "react";
import * as A from "Types/apollo";
import { gameMock } from "Components/GameTile/__mocks__/Game";
import jackpots from "Components/Jackpots/__mocks__/response.jackpots.mock";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowText } from "Components/GameRow/GameRowText";
import { GameRowSearchText } from "Components/GameRow/GameRowSearchText";
import MockStore from "Components/MockStore";

const stories = storiesOf("GameRow", module);
stories.addDecorator(withKnobs);
const gonzosQuest = "gonzos-quest";
const jackpot = jackpots[1];

const propsDefault = {
  game: gameMock,
  onLaunchGame: action(gonzosQuest),
  renderText: () => (
    <GameRowText name={gameMock.name} description={gameMock.gameStudio} />
  ),
};
stories.add("Default", () => (
  <MockStore>
    <GameRow {...propsDefault} />
  </MockStore>
));

const propsShowingJackpot = {
  game: { ...gameMock, jackpot },
  renderText: () => (
    <GameRowText
      name={gameMock.name}
      description={gameMock.gameStudio}
      jackpot={jackpot as A.Jackpots_GameFragment["jackpot"]}
      locale="en"
    />
  ),
  onLaunchGame: action(gonzosQuest),
};
stories.add("Showing a Jackpot", () => (
  <MockStore>
    <GameRow {...propsShowingJackpot} />
  </MockStore>
));

const propsSearchWithMatch = {
  game: gameMock,
  onLaunchGame: action(gonzosQuest),
  renderText: () => (
    <GameRowSearchText
      name={gameMock.name}
      isInMaintenance={gameMock.isInMaintenance}
      search={{ query: "gon", highlightSearchQuery: true }}
    />
  ),
};
stories.add("Search with match", () => (
  <MockStore>
    <GameRow {...propsSearchWithMatch} />
  </MockStore>
));

const propsSearchWithNoMatch = {
  game: gameMock,
  onLaunchGame: action(gonzosQuest),
  renderText: () => (
    <GameRowSearchText
      name={gameMock.name}
      isInMaintenance={gameMock.isInMaintenance}
      search
    />
  ),
};
stories.add("Search with no match", () => (
  <MockStore>
    <GameRow {...propsSearchWithNoMatch} />
  </MockStore>
));

const isInMaintenance = boolean("In maintenance mode", true);
const propsGameInMaintenance = {
  game: { ...gameMock, isInMaintenance },
  onLaunchGame: action(gonzosQuest),
  renderText: () => (
    <GameRowSearchText
      name={gameMock.name}
      isInMaintenance={isInMaintenance}
      search
    />
  ),
};
stories.add("Showing Games in maintenance mode", () => (
  <MockStore>
    <GameRow {...propsGameInMaintenance} />
  </MockStore>
));
