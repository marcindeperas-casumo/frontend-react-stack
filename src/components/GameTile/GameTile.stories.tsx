import { storiesOf } from "@storybook/react";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import MockStore from "Components/MockStore";
import { GameTile } from "Components/GameTile/GameTile";
import game from "./__mocks__/Game.json";

const stories = storiesOf("GameTile", module);
stories.addDecorator(withKnobs);

stories.add("Default", () => {
  const isInMaintenance = boolean("In maintenance mode", game.isInMaintenance);
  return (
    <div className="c-top-game">
      <MockStore>
        <GameTile
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ isInMaintenance: any; name: string; slug: ... Remove this comment to see the full error message
          game={{ ...game, isInMaintenance }}
          onLaunchGame={action(game.name)}
          onFavouriteGame={action("favourite game")}
        />
      </MockStore>
    </div>
  );
});
