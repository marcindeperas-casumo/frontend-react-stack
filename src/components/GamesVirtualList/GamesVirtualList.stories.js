// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { GamesVirtualList } from "Components/GamesVirtualList/GamesVirtualList";
import MockStore from "Components/MockStore";
import { GameRow } from "Components/GameRow";
import { GamesVirtualListTitle } from "Components/GamesVirtualList/GamesVirtualListTitle";

const stories = storiesOf("GamesVirtualList", module);

const games = [
  { game: "easter-island" },
  { game: "starburst" },
  { game: "mega-fortune" },
  { game: "mega-fortune-dreams" },
  { game: "bakers-treat" },
  { sectionTitle: "More fun games" },
  { game: "rapunzels-tower" },
  { game: "big-bad-wolf" },
  { game: "book-of-ra-deluxe" },
  { game: "diamond-mine" },
  { game: "raging-rhino" },
  { game: "jammin-jars" },
  { game: "legacy-of-egypt" },
  { game: "danger-high-voltage" },
  { game: "88-fortunes" },
  { game: "fruit-warp" },
  { game: "gonzos-quest" },
  { game: "white-rabbit" },
  { game: "action-bank" },
  { game: "wild-toro" },
  { game: "twin-spin" },
];

stories.add("Default", () => (
  <MockStore>
    <div className="u-height--screen">
      <GamesVirtualList
        games={games}
        renderItem={id => <GameRow id={id} />}
        renderTitle={sectionTitle => (
          <GamesVirtualListTitle title={sectionTitle} />
        )}
        preloadFetchPlayerGames={() => {}}
        preloadFetchPlayerGamesCount={() => {}}
        rowCount={20}
      />
    </div>
  </MockStore>
));
