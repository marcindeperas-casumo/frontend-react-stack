import { action } from "@storybook/addon-actions";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { storiesOf } from "@storybook/react";
import classNames from "classnames";
import React from "react";
import GameTile from "./";

const stories = storiesOf("GameTile", module);
stories.addDecorator(withKnobs);

stories.add("Default view", () => {
  const game = {
    name: "Gonzo&#8217;s Quest",
    slug: "gonzos-quest",
    logoBackground:
      "https://cms.casumo.com/wp-content/uploads/2014/06/GonzosQuest_Thumb.jpg",
    logo:
      "https://cms.casumo.com/wp-content/uploads/2014/02/GonzosQuest_Logo.png",
    hasPlayForFun: true,
    inMaintenanceMode: boolean("In maintenance mode", false),
    jackpotId: null,
    providerGameId: "eldorado_not_mobile_sw",
  };

  return (
    <div className="o-flex">
      <GameTile key={game.slug} {...game} launchGame={action(game.slug)} />
    </div>
  );
});
