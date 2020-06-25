// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowText } from "Components/GameRow/GameRowText";
import { GamesVirtualList } from "./GamesVirtualList";
import { GamesVirtualListTitle } from "./GamesVirtualListTitle";
import { games } from "./__mock__";

const stories = storiesOf("GamesVirtualList", module);

const props = {
  games,
  renderItem: game => (
    <GameRow
      game={game}
      onLaunchGame={() => {}}
      renderText={() => <GameRowText name={game.name} />}
    />
  ),
  renderTitle: sectionTitle => <GamesVirtualListTitle title={sectionTitle} />,
  preloadFetchPlayerGames: () => {},
  preloadFetchPlayerGamesCount: () => {},
  rowCount: games.length,
  fetchMoreRows: () => Promise.resolve(games),
};
stories.add("Default", () => (
  <MockStore>
    <div className="u-height--screen">
      <GamesVirtualList {...props} />
    </div>
  </MockStore>
));
stories.add("Default (big)", () => (
  <MockStore>
    <div className="u-height--screen">
      <GamesVirtualList
        big
        {...props}
        renderItem={game => (
          <GameRow
            big
            game={game}
            onLaunchGame={() => {}}
            renderText={() => <GameRowText name={game.name} />}
          />
        )}
      />
    </div>
  </MockStore>
));
