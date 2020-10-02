// @flow
import * as React from "react";
import * as R from "ramda";
import List from "@casumo/cmp-list";
import * as A from "Types/apollo";
import { ReelRaceLeaderboardListEntry } from "./ReelRaceLeaderboardListEntry";

import "./ReelRaceLeaderboard.scss";

type Props = {
  leaderboard: Array<A.ReelRaceWidgetQuery_reelRaces_leaderboard>,
  playerId: string,
  size?: number,
  prizes: Array<string>,
};

const LEADERBOARD_SIZE = 25;

export const getPrize = (position: number, prizes: Array<string>) =>
  prizes[position - 1] || null;

export function ReelRaceLeaderboardResults({
  playerId,
  leaderboard,
  size = LEADERBOARD_SIZE,
  prizes = [],
}: Props) {
  const sorted = R.sortBy(R.prop("position"))(leaderboard);
  const leaderboardSortedSliced = sorted.slice(0, size);

  return (
    <div>
      <List
        itemSpacing="none"
        items={leaderboardSortedSliced}
        render={({
          points,
          position,
          playerName,
          playerId: playerIdFromLeaderboard,
        }) => (
          <ReelRaceLeaderboardListEntry
            points={points}
            position={position}
            text={playerName}
            prize={getPrize(position, prizes)}
            highlighted={playerIdFromLeaderboard === playerId}
          />
        )}
      />
    </div>
  );
}
