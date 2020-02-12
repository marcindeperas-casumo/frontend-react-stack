// // @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { GameListHorizontalDefault } from "./GameListHorizontalDefault";
import { GameListQuery } from "./GameListHorizontalDefault.graphql";

const stories = storiesOf("GameListHorizontalDefault", module);
const mocks = [
  {
    request: {
      query: GameListQuery,
      variables: {
        name: "latestPlayedGames",
      },
    },
    result: {
      data: {
        gamesList: {
          id: "latestPlayedGames",
          name: "Continue playing",
          games: [
            {
              isInMaintenance: false,
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2018/05/pirates_charm_thumbnail.jpg",
              logo:
                "https://cms.casumo.com/wp-content/uploads/2018/05/pirates_charm_logo.png",
              name: "Pirate’s Charm",
              slug: "pirates-charm",
              id: "d134f7e0-529e-11e8-a764-0242ac110002",
              isInMyList: false,
            },
            {
              isInMaintenance: false,
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2019/07/Sticky_bandits_wild_Thumbnail_BG.png",
              logo:
                "https://cms.casumo.com/wp-content/uploads/2019/07/Sticky_bandits_wild_Thumbnail_Logo.png",
              name: "Sticky Bandits Wild Return",
              slug: "sticky-bandits-wild-return",
              id: "2db3b650-b1da-11e9-9665-0242ac110002",
              isInMyList: false,
            },
            {
              isInMaintenance: false,
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2016/06/PlayNGo-FireJoker-Thumb.jpg",
              logo:
                "https://cms.casumo.com/wp-content/uploads/2016/06/PlayNGo-FireJoker-Logo.png",
              name: "Fire Joker",
              slug: "fire-joker",
              id: "fa0cc9f0-8cb9-11e7-b1fd-005056a03af2",
              isInMyList: false,
            },
            {
              isInMaintenance: false,
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2018/03/easter_island_thumbnail.jpg",
              logo:
                "https://cms.casumo.com/wp-content/uploads/2018/03/easter_island_logo.png",
              name: "Easter Island",
              slug: "easter-island",
              id: "4b452d50-2db7-11e8-9e3c-0242ac110003",
              isInMyList: false,
            },
            {
              isInMaintenance: false,
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2018/10/dragons_fire_thumbnail.jpg",
              logo:
                "https://cms.casumo.com/wp-content/uploads/2018/10/dragons_fire_logo.png",
              name: "Dragon’s Fire",
              slug: "dragon-fire",
              id: "2f93c820-d387-11e8-b1e4-0242ac110002",
              isInMyList: false,
            },
            {
              isInMaintenance: false,
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2017/09/rapunzels_tower_thumbnail.jpg",
              logo:
                "https://cms.casumo.com/wp-content/uploads/2017/09/rapunzels_tower_logo.png",
              name: "Rapunzel’s Tower",
              slug: "rapunzels-tower",
              id: "8f1bceb0-d378-11e7-b562-005056a03af2",
              isInMyList: false,
            },
            {
              isInMaintenance: false,
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2015/08/bigbadwolfbgthumb.jpg",
              logo:
                "https://cms.casumo.com/wp-content/uploads/2015/08/bigbadwolf_logo.png",
              name: "Big Bad Wolf",
              slug: "big-bad-wolf",
              id: "9738a211-311a-11e5-9734-005056a03af2",
              isInMyList: false,
            },
          ],
        },
      },
    },
  },
];

stories.add("Default", () => (
  <MockedProvider mocks={mocks}>
    <GameListHorizontalDefault list={mocks[0].result.data.gamesList} />
  </MockedProvider>
));
