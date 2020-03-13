// @flow
import * as React from "react";
import * as R from "ramda";
import classNames from "classnames";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { PrizeIcon } from "@casumo/cmp-icons";
import { useReelRaceLeaderboard } from "Models/reelRaceWidget";
import { ReelRacePlayerBoosters } from "./ReelRacePlayerBoosters";
import { ReelRacePlayerInfo } from "./ReelRacePlayerInfo";
import "./ReelRaceLeaderboard.scss";

type Props = {
  playerId: string,
  endTime: number,
  t: {
    spins: string,
    ending_in: string,
  },
};

export function ReelRaceLeaderboard(props: Props) {
  const board = useReelRaceLeaderboard();
  const player = R.find(R.propEq("playerId", props.playerId))(board);

  return (
    <Flex direction="vertical">
      {player && (
        <>
          <ReelRacePlayerInfo spins={player.remainingSpins} {...props} />
          <ReelRacePlayerBoosters boosters={player.boosters} />
        </>
      )}
      {board.map(p => (
        <Flex
          direction="horizontal"
          key={p.playerId}
          className={classNames({
            "u-font-weight-bold t-background-turquoise t-color-white":
              props.playerId === p.playerId,
          })}
        >
          <Text
            tag="div"
            size="xs"
            className="u-text-align-center u-padding c-reel-race-leaderboard-widget__position"
          >
            {p.position === 1 ? <PrizeIcon size="sm" /> : p.position}
          </Text>
          <Text tag="div" size="xs" className="u-width--2/5 u-padding">
            {p.playerName}
          </Text>
          <Text
            tag="div"
            size="xs"
            className="u-width--1/5 u-padding u-text-align-right"
          >
            {p.points}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}
