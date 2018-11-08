import React from "react";
import { storiesOf } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";

import game from "Components/GameTile/__mocks__/Game.json";
import jackpotInfo from "Components/GameTile/__mocks__/JackpotGameInfo.json";
import MockStore from "Components/MockStore";

import GameRow from "./GameRow";
import GameRowContainer from ".";

const stories = storiesOf("GameRow", module);

stories.add(
  "Default (Connected)",
  () => (
    <MockStore>
      <GameRowContainer
        id="hall-of-gods"
        onLaunchGame={action("hall-of-gods")}
      />
    </MockStore>
  ),
  info({ text: "Default" })
);

stories.add(
  "Default",
  () => <GameRow game={game} onLaunchGame={action("gonzos-quest")} />,
  info({ text: "Default" })
);

stories.add(
  "With Jackpot",
  () => (
    <GameRow
      game={{ ...game, jackpotInfo }}
      onLaunchGame={action("gonzos-quest")}
    />
  ),
  info({ text: "With Jackpot" })
);
