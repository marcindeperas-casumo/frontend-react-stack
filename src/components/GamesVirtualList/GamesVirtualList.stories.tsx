import { storiesOf } from "@storybook/react";
import React from "react";
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
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ game: any; onLaunchGame: () => void; rende... Remove this comment to see the full error message
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
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ games: { isInMaintenance: boolean; backgro... Remove this comment to see the full error message */}
      <GamesVirtualList {...props} />
    </div>
  </MockStore>
));
