// @flow
import * as React from "react";
import * as R from "ramda";
import cx from "classnames";
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
  style?: Object,
  currentPositionRef?: React.Ref<any>,
  scrollable?: boolean,
};

type ListProps = {
  items: Array<A.ReelRaceWidgetQuery_reelRaces_leaderboard>,
  prizes?: Array<string>,
  forceLaurelPositions?: number,
  className?: string,
  inverted?: boolean,
  playerId: string,
  rowClassName?: string,
  currentPositionRef?: React.Ref<any>,
  listRef?: React.Ref<any>,
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
  rowClassName = "",
  currentPositionRef = null,
  listRef = null,
}: ListProps) => (
  <div className={className}>
    {items.map(
      ({ points, position, playerName, playerId: playerIdFromLeaderboard }) => {
        const prize = getPrize(position, prizes);
        const isHighlighted = playerIdFromLeaderboard === playerId;
        return (
          <ReelRaceLeaderboardListEntry
            key={position}
            points={points}
            position={position}
            text={playerName}
            prize={prize}
            showLaurel={position <= forceLaurelPositions || Boolean(prize)}
            highlighted={isHighlighted}
            inverted={inverted}
            ref={isHighlighted ? currentPositionRef : null}
            className={cx({
              [rowClassName]: !isHighlighted && rowClassName,
              "t-border-bottom t-border-grey-5": !inverted,
            })}
          />
        );
      }
    )}
  </div>
);

export function ReelRaceLeaderboardResults({
  playerId,
  leaderboard = [],
  size = LEADERBOARD_SIZE,
  prizes = [],
  forceLaurelPositions = 0,
  inverted = false,
  fixedRows = 0,
  className,
  rowClassName = "",
  scrollable = false,
  style = {},
}: Props) {
  const listRef = React.useRef(null);
  const currentPositionRef = React.useRef(null);
  const sorted = R.sortBy(R.prop("position"))(leaderboard);
  const leaderboardSortedSliced = sorted.slice(0, size);

  const commonProps = {
    prizes,
    forceLaurelPositions,
    playerId,
    inverted,
    rowClassName,
    listRef,
    currentPositionRef,
  };

  const bgRowClass = rowClassName
    .split(/[ ]+/g)
    .filter(c => c.includes("background"))
    .join(" ");

  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, 0);
    }
    setTimeout(() => {
      if (currentPositionRef.current) {
        currentPositionRef.current.scrollIntoView(false);
      }
    }, 0);
  }, [leaderboard]);

  return (
    <div
      className={cx(
        className,
        "c-reel-race-leaderboard-results u-position-relative u-overflow-x--hidden",
        {
          "t-opacity-border--0": inverted,
          "u-overflow-y--hidden": !scrollable,
          "c-reel-race-leaderboard-results--scrollable u-overflow-y--scroll": scrollable,
        }
      )}
      ref={listRef}
      style={style}
    >
      <InnerList
        className={`c-reel-race-leaderboard-results__sticky-list u-position-sticky--top ${bgRowClass}`}
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
