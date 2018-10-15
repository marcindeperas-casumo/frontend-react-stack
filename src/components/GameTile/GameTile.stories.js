import { action } from "@storybook/addon-actions";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { storiesOf } from "@storybook/react";
import React from "react";
import info from "../../../.storybook/storybookInfo";
import GameTile from "Components/GameTile";
import GameTileExclusive from "Components/GameTileExclusive";

const stories = storiesOf("GameTile", module);
stories.addDecorator(withKnobs);

const game = {
  name: "Gonzo&#8217;s Quest",
  slug: "gonzos-quest",
  logoBackground:
    "https://cms.casumo.com/wp-content/uploads/2014/06/GonzosQuest_Thumb.jpg",
  logo:
    "https://cms.casumo.com/wp-content/uploads/2014/02/GonzosQuest_Logo.png",
  hasPlayForFun: true,
  inMaintenanceMode: false,
  jackpotId: null,
  onLaunchGame: action("gonzos-quest"),
};

const jackpotInfo = {
  games: [
    {
      name: "Mega Fortune",
    },
  ],
  jackpotId: "netent-megajackpot1",
  jackpotType: "Pooled",
  iso4217CurrencyCode: "GBP",
  jackpotAmount: 1837434.164833,
  formattedJackpotAmount: "£1,837,434.16",
  latestPayoutDate: 1536766014631,
  payoutCount: 0,
  totalJackpotAmountPaidOut: 0,
  formattedTotalJackpotAmountPaidOut: "£0.00",
};

const exclusiveGame = {
  name: "Jammin Jars",
  slug: "jammin-jars",
  logo:
    "https://cms.casumo.com/wp-content/uploads/2018/09/jamminjar-logo-480x580.png",
  logoBackground:
    "https://cms.casumo.com/wp-content/uploads/2018/09/jamminjars-bg-480-580.png",
  hasPlayForFun: true,
  inMaintenanceMode: false,
  jackpotId: null,
  onLaunchGame: action("jammin-jars"),
};

stories.add(
  "Default Tile",
  () => {
    const inMaintenanceMode = boolean(
      "In maintenance mode",
      game.inMaintenanceMode
    );
    return <GameTile {...game} inMaintenanceMode={inMaintenanceMode} />;
  },
  info({ text: "Default Tile" })
);

stories.add(
  "With Jackpot",
  () => {
    const inMaintenanceMode = boolean(
      "In maintenance mode",
      game.inMaintenanceMode
    );
    return (
      <GameTile
        {...{ ...game, jackpotInfo }}
        inMaintenanceMode={inMaintenanceMode}
      />
    );
  },
  info({ text: "With Jackpot" })
);

stories.add(
  "Tall Tile",
  () => {
    const inMaintenanceMode = boolean(
      "In maintenance mode",
      exclusiveGame.inMaintenanceMode
    );
    return (
      <GameTileExclusive
        {...exclusiveGame}
        inMaintenanceMode={inMaintenanceMode}
      />
    );
  },
  info({ text: "Tall Tile" })
);
