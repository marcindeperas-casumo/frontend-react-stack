// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { launchGame } from "Services/LaunchGameService";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import type { Game } from "Types/game";

type ProviderGamesListRowProps = {
  style: string,
  game: Game,
};

export const ProviderGamesListRow = ({
  style,
  game,
}: ProviderGamesListRowProps) => (
  <div className="u-padding-x--md t-border-bottom" style={style}>
    <GameRow game={game} onLaunchGame={() => launchGame({ slug: game.slug })} />
  </div>
);

type ProviderGamesListRowSkeletonProps = {
  style: string,
};

export const ProviderGamesListRowSkeleton = ({
  style,
}: ProviderGamesListRowSkeletonProps) => (
  <Flex className="u-margin-x--md" align="center" style={style}>
    <GameRowSkeleton />
  </Flex>
);
