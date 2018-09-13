import { action } from "@storybook/addon-actions";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { storiesOf } from "@storybook/react";
import React from "react";
import GameTile from "./";

const stories = storiesOf("GameTile", module);
stories.addDecorator(withKnobs);

stories.add("Default Tile", () => {
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
  };
  return (
    <div style={{ maxWidth: "170px" }}>
      <GameTile
        key={game.slug}
        name={game.name}
        slug={game.slug}
        inMaintenanceMode={game.inMaintenanceMode}
        launchGame={action(game.slug)}
        logoBackground={game.logoBackground}
        logo={game.logo}
      />
    </div>
  );
});

stories.add("With Jackpot", () => {
  const game = {
    name: "Mega Fortune",
    slug: "mega-fortune",
    logoBackground:
      "https://cms.casumo.com/wp-content/uploads/2014/06/MegaFortune_Thumb.jpg",
    logo:
      "https://cms.casumo.com/wp-content/uploads/2014/02/MegaFortune_Logo.png",
    hasPlayForFun: true,
    inMaintenanceMode: boolean("In maintenance mode", false),
    jackpotId: "netent-megajackpot1",
    tableId: null,
    jackpotInfo: {
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
    },
  };
  return (
    <div style={{ maxWidth: "170px" }}>
      <GameTile
        key={game.slug}
        name={game.name}
        slug={game.slug}
        inMaintenanceMode={game.inMaintenanceMode}
        launchGame={action(game.slug)}
        logoBackground={game.logoBackground}
        logo={game.logo}
        jackpotInfo={game.jackpotInfo}
      />
    </div>
  );
});

stories.add("Tall Tile", () => {
  const game = {
    name: "Jammin Jars",
    slug: "jammin-jars",
    logo:
      "https://cms.casumo.com/wp-content/uploads/2018/09/jamminjar-logo-480x580.png",
    logoBackground:
      "https://cms.casumo.com/wp-content/uploads/2018/09/jamminjars-bg-480-580.png",
    hasPlayForFun: true,
    inMaintenanceMode: boolean("In maintenance mode", false),
    jackpotId: null,
  };

  return (
    <div style={{ maxWidth: "188px" }}>
      <GameTile
        ratio="game-tile-exclusive"
        key={game.slug}
        name={game.name}
        slug={game.slug}
        inMaintenanceMode={game.inMaintenanceMode}
        launchGame={action(game.slug)}
        logoBackground={game.logoBackground}
        logo={game.logo}
        imgixOpts={{
          w: 188,
          h: 280,
          fit: "scale",
        }}
      />
    </div>
  );
});
