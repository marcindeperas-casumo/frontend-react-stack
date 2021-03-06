import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { TrophyIcon } from "@casumo/cmp-icons";
import * as React from "react";
import * as R from "ramda";
import classNames from "classnames";
import { useSelector } from "react-redux";
import * as A from "Types/apollo";
import { playerIdSelector } from "Models/handshake";
import { ReelRacePlayerBoosters } from "./ReelRacePlayerBoosters";
import { ReelRacePlayerInfo } from "./ReelRacePlayerInfo";
import { useReelRaceLeaderboard } from "./useReelRaceLeaderboard";
import "./ReelRaceLeaderboard.scss";

type Props = {
  id: string;
  t: {
    spins: string;
    ending_in: string;
  };
  initialLeaderboard: A.ReelRaceWidgetQuery["reelRaces"][number]["leaderboard"];
  cometdChannels: Array<string>;
  endTime: number;
};

export function ReelRaceLeaderboard(props: Props) {
  const playerId = useSelector(playerIdSelector);
  const board = useReelRaceLeaderboard(
    props.id,
    props.cometdChannels,
    props.initialLeaderboard
  );
  const player = R.find(R.propEq("playerId", playerId))(
    board
  ) as typeof board[number];

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
            "u-font-weight-bold bg-teal-50 text-white": playerId === p.playerId,
          })}
        >
          <Text
            tag="div"
            size="xs"
            className="u-text-align-center u-padding c-reel-race-leaderboard-widget__position"
          >
            {p.position === 1 ? <TrophyIcon size="sm" /> : p.position}
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
