// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MockStore from "Components/MockStore";
import TileListHorizontal from "Components/TileListHorizontal";
import TileListHorizontalPresentational from "Components/TileListHorizontal/TileListHorizontal";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("TileListHorizontal", module);
const title = "Game Providers";
const items = [
  {
    background: "https://images.casumo.com/2019/02/evolution-bg.png",
    logo: "https://images.casumo.com/2019/02/evolution.png",
    url: "/en/games/provider/casumo-services-ltd-evolution",
    id: "game-providers-casumo-services-ltd-evolution",
  },
  {
    background: "https://images.casumo.com/2019/02/netent-bg.png",
    logo: "https://images.casumo.com/2019/02/netent.png",
    url: "/en/games/provider/casumo-services-ltd-netent",
    id: "game-providers-casumo-services-ltd-netent",
  },
  {
    background: "https://images.casumo.com/2019/02/redtiger-bg.png",
    logo: "https://images.casumo.com/2019/02/redtiger.png",
    url: "/en/games/provider/casumo-services-ltd-redtiger",
    id: "game-providers-casumo-services-ltd-redtiger",
  },
  {
    background: "https://images.casumo.com/2019/02/quickspin-bg.png",
    logo: "https://images.casumo.com/2019/02/quickspin.png",
    url: "/en/games/provider/casumo-services-ltd-quickspin",
    id: "game-providers-casumo-services-ltd-quickspin",
  },
  {
    background: "https://images.casumo.com/2019/02/playngo-bg.png",
    logo: "https://images.casumo.com/2019/02/playngo.png",
    url: "/en/games/provider/casumo-services-ltd-playngo",
    id: "game-providers-casumo-services-ltd-playngo",
  },
  {
    background: "https://images.casumo.com/2019/02/nextgen-bg.png",
    logo: "https://images.casumo.com/2019/02/nextgen.png",
    url: "/en/games/provider/casumo-services-ltd-nextgen",
    id: "game-providers-casumo-services-ltd-nextgen",
  },
  {
    background: "https://images.casumo.com/2019/02/relax-bg.png",
    logo: "https://images.casumo.com/2019/02/relax.png",
    url: "/en/games/provider/casumo-services-ltd-relax",
    id: "game-providers-casumo-services-ltd-relax",
  },
];

stories.add(
  "Game Providers List (Presentational)",
  () => (
    <MockStore>
      <TileListHorizontalPresentational
        isLoaded={true}
        title={title}
        items={items}
      />
    </MockStore>
  ),
  info({ text: `...` })
);

if (isNotChromatic) {
  stories.add(
    "Game Providers List (Connected)",
    () => (
      <MockStore>
        <TileListHorizontal title={"Game Providers"} type={"game-providers"} />
      </MockStore>
    ),
    info({ text: `...` })
  );
}