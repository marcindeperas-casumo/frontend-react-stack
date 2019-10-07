// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import GameTileConnected from "Components/GameTile";
import GameTile from "Components/GameTile/GameTile";
import isNotChromatic from "Storybook/isNotChromatic";
import game from "./__mocks__/Game.json";
import jackpotInfo from "./__mocks__/JackpotGameInfo.json";

const stories = storiesOf("GameTile", module);
stories.addDecorator(withKnobs);

if (isNotChromatic) {
  stories.add("Default (Connected)", () => {
    return (
      <div className="c-top-game">
        <MockStore>
          <GameTileConnected id="starburst" />
        </MockStore>
      </div>
    );
  });
}

stories.add("Default", () => {
  const inMaintenanceMode = boolean(
    "In maintenance mode",
    game.inMaintenanceMode
  );
  return (
    <div className="c-top-game">
      <MockStore>
        <GameTile
          game={{ ...game, inMaintenanceMode }}
          onLaunchGame={action(game.name)}
          onFavouriteGame={action("favourite game")}
        />
      </MockStore>
    </div>
  );
});

stories.add("With Jackpot", () => {
  const inMaintenanceMode = boolean(
    "In maintenance mode",
    game.inMaintenanceMode
  );
  return (
    <div className="c-top-game">
      <MockStore>
        <GameTile
          game={{ ...game, jackpotInfo, inMaintenanceMode }}
          onLaunchGame={action(game.name)}
          onFavouriteGame={action("favourite game")}
        />
      </MockStore>
    </div>
  );
});
