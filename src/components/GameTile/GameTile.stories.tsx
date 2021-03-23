import { storiesOf } from "@storybook/react";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import MockStore from "Components/MockStore";
import { GameTile } from "Components/GameTile/GameTile";
import { CURRENCIES } from "Src/constants";
import { gameMock } from "./__mocks__/Game";

const stories = storiesOf("GameTile", module);
stories.addDecorator(withKnobs);

stories.add("Default", () => {
  const isInMaintenance = boolean(
    "In maintenance mode",
    gameMock.isInMaintenance
  );
  return (
    <div className="c-top-game">
      <MockStore>
        <GameTile
          game={{ ...gameMock, isInMaintenance }}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ game: { isInMaintenance: any; __typename: ... Remove this comment to see the full error message
          onLaunchGame={action(gameMock.name)}
          onFavouriteGame={action("favourite game")}
        />
      </MockStore>
    </div>
  );
});

stories.add("Jackpot Game Tile", () => {
  const gameJackpot = {
    id: "someID",
    value: {
      amount: 123456789,
      currency: CURRENCIES.EUR,
    },
  };

  const gameInfo = {
    ...gameMock,
    jackpot: gameJackpot,
    id: "someCrappyString",
    playBackground: "testbg",
  };
  const t = { play_button_text_game_tile: "Play" };

  return (
    <div className="c-top-game">
      <MockStore>
        <GameTile game={{ ...gameInfo }} t={t} />
      </MockStore>
    </div>
  );
});
