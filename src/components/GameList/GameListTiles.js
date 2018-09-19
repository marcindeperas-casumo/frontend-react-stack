import React from "react";
import Flex from "@casumo/cmp-flex";
import GameTile from "../GameTile";
import { emitLaunchGame } from "./GameList";

export default function GameListTiles({ game }) {
  return (
    <Flex.Item
      className="o-flex__item-fixed-size o-flex c-top-game"
      key={game.slug}
    >
      <GameTile {...game} launchGame={() => emitLaunchGame(game.slug)} />
    </Flex.Item>
  );
}
