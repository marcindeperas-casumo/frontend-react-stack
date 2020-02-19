// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { GamesVirtualList } from "Components/GamesVirtualList/GamesVirtualList";
import MockStore from "Components/MockStore";
import { GameRow } from "Components/GameRow/GameRow";
import { GamesVirtualListTitle } from "Components/GamesVirtualList/GamesVirtualListTitle";
import { games } from "./__mock__";

const stories = storiesOf("GamesVirtualList", module);

stories.add("Default", () => (
  <MockStore>
    <div className="u-height--screen">
      <GamesVirtualList
        games={games}
        renderItem={game => <GameRow game={game} onLaunchGame={() => {}} />}
        renderTitle={sectionTitle => (
          <GamesVirtualListTitle title={sectionTitle} />
        )}
        preloadFetchPlayerGames={() => {}}
        preloadFetchPlayerGamesCount={() => {}}
        rowCount={games.length}
        fetchMoreRows={() => Promise.resolve(games)}
      />
    </div>
  </MockStore>
));
