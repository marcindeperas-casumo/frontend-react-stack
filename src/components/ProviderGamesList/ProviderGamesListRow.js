// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { GameRow, GameRowText } from "Components/GameRow";
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
  <div className="u-padding-x--md u-padding-y t-border-bottom" style={style}>
    <GameRow game={game} renderText={() => <GameRowText name={game.name} />} />
  </div>
);

type ProviderGamesListRowSkeletonProps = {
  style: string,
};

export const ProviderGamesListRowSkeleton = ({
  style,
}: ProviderGamesListRowSkeletonProps) => (
  <Flex className="u-margin-x--md u-padding-y" align="center" style={style}>
    <GameRowSkeleton />
  </Flex>
);
