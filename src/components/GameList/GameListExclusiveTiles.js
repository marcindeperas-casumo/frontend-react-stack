import React from "react";
import Flex from "@casumo/cmp-flex";
import GameTile from "../GameTile";
import { emitLaunchGame } from "./GameList";

export default function GameListExclusiveTiles({ game }) {
  return (
    <Flex.Item
      className="o-flex__item-fixed-size o-flex c-exclusive-game"
      key={game.slug}
    >
      <GameTile
        {...game}
        ratio="game-tile-exclusive"
        imgixOpts={{
          w: 188,
          h: 280,
          fit: "crop",
        }}
        launchGame={() => emitLaunchGame(game.slug)}
      />
    </Flex.Item>
  );
}
