// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import * as A from "Types/apollo";
import { GameRow, GameRowText } from "Components/GameRow";
import { GameRowSkeleton } from "Components/GameRowSkeleton";

type ProviderGamesListRowProps = {
  style: string,
  game: A.GameStudioQuery_gameStudio_games,
};

export const ProviderGamesListRow = ({
  style,
  game,
}: ProviderGamesListRowProps) => (
  <div
    className="u-padding-x--md u-padding-y t-border-bottom t-border-grey-5"
    style={style}
  >
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
