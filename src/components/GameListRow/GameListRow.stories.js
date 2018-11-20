import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import game from "Components/GameTile/__mocks__/Game.json";
import jackpotInfo from "Components/GameTile/__mocks__/JackpotGameInfo.json";
import MockStore from "Components/MockStore";
import GameListRow from "Components/GameListRow/GameListRow";
import GameListRowContainer from "Components/GameListRow";

const stories = storiesOf("GameListRow", module);

stories.add(
  "Default (Connected)",
  () => (
    <MockStore>
      <GameListRowContainer id="hall-of-gods" />
    </MockStore>
  ),
  info({ text: "Default" })
);

stories.add(
  "Default",
  () => <GameListRow game={game} onLaunchGame={action("gonzos-quest")} />,
  info({ text: "Default" })
);

stories.add(
  "With Jackpot",
  () => (
    <GameListRow
      game={{ ...game, jackpotInfo }}
      onLaunchGame={action("gonzos-quest")}
    />
  ),
  info({ text: "With Jackpot" })
);
