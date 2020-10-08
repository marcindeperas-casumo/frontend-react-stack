// @flow
import * as React from "react";
import * as R from "ramda";
import cx from "classnames";
import List from "@casumo/cmp-list";
import * as A from "Types/apollo";
import { ReelRaceLeaderboardListEntry } from "./ReelRaceLeaderboardListEntry";

import "./ReelRaceLeaderboardResults.scss";

type Props = {
  leaderboard: Array<A.ReelRaceWidgetQuery_reelRaces_leaderboard>,
  playerId: string,
  size?: number,
  prizes?: Array<string>,
  forceLaurelPositions?: number,
  className?: string,
  inverted?: boolean,
  fixedRows?: number,
  rowClassName?: string,
};

type ListProps = {
  items: Array<A.ReelRaceWidgetQuery_reelRaces_leaderboard>,
  prizes?: Array<string>,
  forceLaurelPositions?: number,
  className?: string,
  inverted?: boolean,
  playerId: string,
  rowClassName?: string,
};

const LEADERBOARD_SIZE = 25;

export const getPrize = (position: number, prizes?: Array<string> = []) =>
  prizes[position - 1] || null;

const InnerList = ({
  items = [],
  className,
  prizes = [],
  forceLaurelPositions = 0,
  playerId,
  inverted = false,
  rowClassName,
}: ListProps) => (
  <div className={className}>
    <List
      itemSpacing="none"
      items={items}
      render={({
        points,
        position,
        playerName,
        playerId: playerIdFromLeaderboard,
      }) => {
        const prize = getPrize(position, prizes);
        const isHighlighted = playerIdFromLeaderboard === playerId;
        return (
          <ReelRaceLeaderboardListEntry
            points={points}
            position={position}
            text={playerName}
            prize={prize}
            showLaurel={position <= forceLaurelPositions || Boolean(prize)}
            highlighted={isHighlighted}
            inverted={inverted}
            className={!isHighlighted ? rowClassName : ""}
          />
        );
      }}
    />
  </div>
);

export function ReelRaceLeaderboardResults({
  playerId,
  leaderboard,
  size = LEADERBOARD_SIZE,
  prizes = [],
  forceLaurelPositions = 0,
  inverted = false,
  fixedRows = 0,
  className,
  rowClassName,
}: Props) {
  const sorted = R.sortBy(R.prop("position"))(leaderboard);
  const leaderboardSortedSliced = sorted.slice(0, size);

  const commonProps = {
    prizes,
    forceLaurelPositions,
    playerId,
    inverted,
    rowClassName,
  };
  return (
    <div
      className={cx(className, "u-position-relative u-overflow--scroll", {
        "t-opacity-border--0": inverted,
      })}
    >
      <InnerList
        className="c-reel-race-leaderboard-results__sticky-list u-position-sticky--top"
        items={leaderboardSortedSliced.slice(0, fixedRows)}
        {...commonProps}
      />
      <InnerList
        items={leaderboardSortedSliced.slice(fixedRows)}
        {...commonProps}
      />
    </div>
  );
}
