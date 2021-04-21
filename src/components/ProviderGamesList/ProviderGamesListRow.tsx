import Flex from "@casumo/cmp-flex";
import React from "react";
import * as A from "Types/apollo";
import { GameRow, GameRowText } from "Components/GameRow";
import { GameRowSkeleton } from "Components/GameRowSkeleton";

type ProviderGamesListRowProps = {
  style: string;
  game: A.GameStudioQuery["gameStudio"]["games"][number];
};

export const ProviderGamesListRow = ({
  style,
  game,
}: ProviderGamesListRowProps) => (
  <div
    className="t-border-bottom t-border-grey-5 bg-white"
    // @ts-expect-error ts-migrate(2559) FIXME: Type 'string' has no properties in common with typ... Remove this comment to see the full error message
    style={style}
  >
    <GameRow game={game} renderText={() => <GameRowText name={game.name} />} />
  </div>
);

type ProviderGamesListRowSkeletonProps = {
  style: string;
};

export const ProviderGamesListRowSkeleton = ({
  style,
}: ProviderGamesListRowSkeletonProps) => (
  <Flex className="u-margin-x--md u-padding-y" align="center" style={style}>
    <GameRowSkeleton />
  </Flex>
);
