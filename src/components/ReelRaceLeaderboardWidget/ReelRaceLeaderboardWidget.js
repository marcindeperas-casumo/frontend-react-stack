// @flow
import * as React from "react";
import * as R from "ramda";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { PrizeIcon } from "@casumo/cmp-icons";
import { useReelRaceLeaderboard } from "Models/reelRaceWidget";
import { ReelRacePlayerBoosters } from "./ReelRacePlayerBoosters";
import "./ReelRaceLeaderboardWidget.scss";

type Props = {
  playerId: string,
};

export function ReelRaceLeaderboardWidget(props: Props) {
  const board = useReelRaceLeaderboard();
  const player = R.find(R.propEq("playerId", props.playerId))(board);

  return (
    <Flex direction="vertical">
      {player && <ReelRacePlayerBoosters boosters={player.boosters} />}
      {board.map(p => (
        <Flex
          direction="horizontal"
          key={p.playerId}
          className={
            props.playerId === p.playerId
              ? "u-font-weight-bold t-background-turquoise t-color-white"
              : ""
          }
        >
          <Text
            tag="div"
            size="xs"
            className="u-text-align-center u-padding c-reel-race-leaderboard-widget-position"
          >
            {p.position === 1 ? <PrizeIcon size="sm" /> : p.position}
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
