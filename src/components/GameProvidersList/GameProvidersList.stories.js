// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import GameProvidersList from "Components/GameProvidersList";
import GameProvidersListPresentational from "Components/GameProvidersList/GameProvidersList";
import GameProvidersListSkeleton from "Components/GameProvidersList/GameProvidersListSkeleton";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("GameProvidersList", module);
const title = "Game Providers";
const items = [
  {
    background:
      "https://cms.casumo.com/wp-content/uploads/2019/03/evolution-bg.png",
    logo: "https://cms.casumo.com/wp-content/uploads/2019/02/evolution1.png",
    url: "/en/games/provider/casumo-services-ltd-evolution",
    id: "game-providers-casumo-services-ltd-evolution",
  },
  {
    background:
      "https://cms.casumo.com/wp-content/uploads/2019/03/netent-bg.png",
    logo: "https://cms.casumo.com/wp-content/uploads/2019/02/netent1.png",
    url: "/en/games/provider/casumo-services-ltd-netent",
    id: "game-providers-casumo-services-ltd-netent",
  },
  {
    background:
      "https://cms.casumo.com/wp-content/uploads/2019/03/redtiger-bg.png",
    logo: "https://cms.casumo.com/wp-content/uploads/2019/02/redtiger1.png",
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
    background:
      "https://cms.casumo.com/wp-content/uploads/2019/03/playngo-bg.png",
    logo: "https://cms.casumo.com/wp-content/uploads/2019/02/playngo2.png",
    url: "/en/games/provider/casumo-services-ltd-playngo",
    id: "game-providers-casumo-services-ltd-playngo",
  },
  {
    background: "https://cms.casumo.com/wp-content/uploads/2019/03/nyx-bg.png",
    logo: "https://cms.casumo.com/wp-content/uploads/2019/02/nyx.png",
    url: "/en/games/provider/casumo-services-ltd-nextgen",
    id: "game-providers-casumo-services-ltd-nextgen",
  },
  {
    background:
      "https://cms.casumo.com/wp-content/uploads/2019/03/relax-bg.png",
    logo: "https://cms.casumo.com/wp-content/uploads/2019/02/relax1.png",
    url: "/en/games/provider/casumo-services-ltd-relax",
    id: "game-providers-casumo-services-ltd-relax",
  },
];

stories.add("Game Providers List (Presentational)", () => (
  <MockStore>
    <GameProvidersListPresentational
      isLoaded={true}
      title={title}
      items={items}
    />
  </MockStore>
));

if (isNotChromatic) {
  stories.add("Game Providers List (Connected)", () => (
    <MockStore>
      <GameProvidersList title={"Game Providers"} type={"game-providers"} />
    </MockStore>
  ));
}

stories.add("Game Providers List Skeleton", () => (
  <GameProvidersListSkeleton />
));
