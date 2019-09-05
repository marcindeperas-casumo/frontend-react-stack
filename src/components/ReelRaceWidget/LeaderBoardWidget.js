// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import * as R from "ramda";
import type { LeaderBoard } from "Models/reelRaceWidget";
import "./ReelRaceWidget.scss";

type Props = {
  leaderboard: Array<LeaderBoard>,
  playerId: string,
};

export function LeaderBoardWidget(props: Props) {
  const l = R.pipe(
    R.values,
    R.sortBy(R.prop("position"))
  )(props.leaderboard);

  const i = R.findIndex(R.propEq("playerId", props.playerId), l);

  const board = R.uniqBy(
    R.prop("playerId"),
    R.concat(R.take(3, l), R.slice(i - 3, i + 1, l))
  );

  return (
    <Flex direction="vertical" className="u-width--1/1">
      {board.map(p => (
        <Flex
          direction="horizontal"
          key={p.playerId}
          className={
            props.playerId === p.playerId
              ? "u-font-weight-bold t-background-yellow"
              : ""
          }
        >
          <Text
            tag="div"
            size="xs"
            className="u-text-align-right u-padding"
            style={{ width: "40px" }}
          >
            {p.position}
          </Text>
          <Text tag="div" size="xs" className="u-width--2/5 u-padding">
            {p.playerName}
          </Text>
          <Text
            tag="div"
            size="xs"
            className="u-width--2/5 u-padding u-text-align-right"
          >
            {p.points}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}
