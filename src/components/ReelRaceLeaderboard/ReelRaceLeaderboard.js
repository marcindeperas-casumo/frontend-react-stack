// @flow
import * as React from "react";
import * as R from "ramda";
import classNames from "classnames";
import { useSelector } from "react-redux";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { PrizeIcon } from "@casumo/cmp-icons";
import * as A from "Types/apollo";
import { playerIdSelector } from "Models/handshake";
import { ReelRacePlayerBoosters } from "./ReelRacePlayerBoosters";
import { ReelRacePlayerInfo } from "./ReelRacePlayerInfo";
import { useReelRaceLeaderboard } from "./useReelRaceLeaderboard";
import "./ReelRaceLeaderboard.scss";

type Props = {
  id: string,
  t: {
    spins: string,
    ending_in: string,
  },
  initialLeaderboard: Array<A.ReelRaceWidgetQuery_reelRaces_leaderboard>,
  cometdChannels: Array<string>,
  endTime: number,
};

export function ReelRaceLeaderboard(props: Props) {
  const playerId = useSelector(playerIdSelector);
  const board = useReelRaceLeaderboard(
    props.id,
    props.cometdChannels,
    props.initialLeaderboard
  );
  const player: A.ReelRaceWidgetQuery_reelRaces_leaderboard = R.find(
    R.propEq("playerId", playerId)
  )(board);

  return (
    <Flex direction="vertical">
      {player && (
        <>
          <ReelRacePlayerInfo
            spins={player.remainingSpins}
            t={props.t}
            endTime={props.endTime}
          />
          <ReelRacePlayerBoosters boosters={player.boosters} />
        </>
      )}
      {board.map(p => (
        <Flex
          direction="horizontal"
          key={p.playerId}
          className={classNames({
            "u-font-weight-bold t-background-teal-50 t-color-white":
              playerId === p.playerId,
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
