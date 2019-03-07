// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import ProviderGamesList from "Components/ProviderGamesList";
import ProviderGamesListPresentational from "Components/ProviderGamesList/ProviderGamesList";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("ProviderGamesList", module);

const provider = {
  inMaintenance: false,
  name: "nyx",
  games: ["bloodsuckers", "easter-island"],
};

const game = {
  game: {
    bloodsuckers: {
      name: "Blood Suckers",
      slug: "bloodsuckers",
      logoBackground:
        "https://cms.casumo.com/wp-content/uploads/2014/06/BloodSuckers_Thumb.jpg",
      logo:
        "https://cms.casumo.com/wp-content/uploads/2014/02/BloodSuckers_Logo.png",
      hasPlayForFun: true,
      inMaintenanceMode: false,
      jackpotId: null,
      tableId: null,
    },
    "easter-island": {
      name: "Easter Island",
      slug: "easter-island",
      logoBackground:
        "https://cms.casumo.com/wp-content/uploads/2018/03/easter_island_thumbnail.jpg",
      logo:
        "https://cms.casumo.com/wp-content/uploads/2018/03/easter_island_logo.png",
      hasPlayForFun: true,
      inMaintenanceMode: false,
      jackpotId: null,
      tableId: null,
    },
  },
};

const state = {
  schema: {
    gameProvider: {
      "casumo-services-ltd-nyx": {
        id: "0c900240-4904-11e6-a7a2-005056a975b1",
        name: "nyx",
        inMaintenance: false,
        slug: "casumo-services-ltd-nyx",
        background:
          "https://cms.casumo.com/wp-content/uploads/2019/02/nyx-bg.png",
        logo: "https://cms.casumo.com/wp-content/uploads/2019/02/nyx.png",
        url: "/en/games/provider/nyx",
        games: ["bloodsuckers", "easter-island"],
      },
    },
    ...game,
  },
};

stories.add(
  "ProviderGamesList (Presentational)",
  () => (
    <MockStore state={{ schema: { game } }}>
      <ProviderGamesListPresentational isLoaded={true} provider={provider} />
    </MockStore>
  ),
  info({ text: "Default" })
);

if (isNotChromatic) {
  stories.add(
    "ProviderGamesList (Connected)",
    () => (
      <MockStore state={state}>
        <ProviderGamesList provider={"casumo-services-ltd-nyx"} />
      </MockStore>
    ),
    info({ text: "" })
  );
}
