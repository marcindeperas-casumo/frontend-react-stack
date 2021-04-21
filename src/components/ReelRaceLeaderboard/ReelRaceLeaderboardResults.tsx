import * as React from "react";
import cx from "classnames";
import * as A from "Types/apollo";
import { useGameActivityAwareLeaderboard } from "Models/reelRaces";
import { ReelRaceLeaderboardListEntry } from "./ReelRaceLeaderboardListEntry";

import "./ReelRaceLeaderboardResults.scss";

type Props = {
  size?: number;
  playerId: string;
  prizes?: Array<string>;
  forceLaurelPositions?: number;
  className?: string;
  inverted?: boolean;
  fixedRows?: number;
  rowClassName?: string;
  style?: Object;
  currentPositionRef?: React.Ref<any>;
  scrollable?: boolean;
};

type ListProps = {
  items: A.ReelRaceWidgetQuery["reelRaces"][number]["leaderboard"];
  prizes?: Array<string>;
  forceLaurelPositions?: number;
  className?: string;
  inverted?: boolean;
  playerId: string;
  rowClassName?: string;
  currentPositionRef?: React.Ref<any>;
  listRef?: React.Ref<any>;
  scrollable?: boolean;
};

export const getPrize = (position: number, prizes: Array<string> = []) =>
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
  scrollable = false,
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
            className={cx("t-border-bottom", {
              [rowClassName]: !isHighlighted && rowClassName,
            })}
          />
        );
      }
    )}
  </div>
);

export function ReelRaceLeaderboardResults({
  playerId,
  prizes = [],
  forceLaurelPositions = 0,
  inverted = false,
  fixedRows = 0,
  className,
  rowClassName = "",
  scrollable = false,
  style = {},
  ...props
}: Props) {
  const listRef = React.useRef(null);
  const currentPositionRef = React.useRef(null);
  const leaderboard = useGameActivityAwareLeaderboard();
  const size = props.size || leaderboard.length;
  const leaderboardSliced = leaderboard.slice(0, size);

  const commonProps = {
    prizes,
    forceLaurelPositions,
    playerId,
    inverted,
    rowClassName,
    listRef,
    scrollable,
    currentPositionRef,
  };

  return (
    <div
      className={cx(className, "u-overflow-x--hidden o-position--relative", {
        "u-padding-right--sm": scrollable,
        "t-opacity-background-100 bg-grey-90": inverted,
      })}
      style={style}
    >
      <div
        className={cx(
          "c-reel-race-leaderboard-results u-overflow-x--hidden u-height--full",
          {
            "t-opacity-border--0": inverted,
            "u-overflow-y--hidden": !scrollable,
            "u-overflow-y--scroll u-padding-right--sm": scrollable,
            "u-scrollbar-regular": scrollable && !inverted,
            "u-scrollbar-inverted": scrollable && inverted,
          }
        )}
        ref={listRef}
      >
        <InnerList
          className="c-reel-race-leaderboard-results__sticky-list o-inset-top--none o-position--sticky"
          items={leaderboardSliced.slice(0, fixedRows)}
          {...commonProps}
        />
        <InnerList
          items={leaderboardSliced.slice(fixedRows)}
          {...commonProps}
        />
      </div>
    </div>
  );
}
