import React from "react";
import Flex from "@casumo/cmp-flex";
import GameTile from "../GameTile";
import { launchGame } from "Services/LaunchGameService";

export default function GameListTiles({ game }) {
  return (
    <Flex.Item
      className="o-flex__item-fixed-size o-flex c-top-game"
      key={game.slug}
    >
      <GameTile {...game} launchGame={() => launchGame(game.slug)} />
    </Flex.Item>
  );
}
