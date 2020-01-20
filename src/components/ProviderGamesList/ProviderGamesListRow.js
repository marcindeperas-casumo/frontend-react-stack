// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { launchGame } from "Services/LaunchGameService";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowSkeleton } from "Components/GameRowSkeleton";

export const ProviderGamesListRow = ({ style, game, onLaunchGame }) => (
  <div className="u-padding-x--md t-border-bottom" style={style}>
    <GameRow game={game} onLaunchGame={() => launchGame({ slug: game.slug })} />
  </div>
);

export const ProviderGamesListRowSkeleton = ({ style }) => (
  <Flex className="u-margin-x--md" align="center" style={style}>
    <GameRowSkeleton />
  </Flex>
);
