// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import * as R from "ramda";
import {
  TripleWinIcon,
  TripleBigWinIcon,
  MegaIcon,
  PrizeIcon,
} from "@casumo/cmp-icons";
import type { LeaderBoard } from "Models/reelRaceLeaderboard";
import "./ReelRaceLeaderboardWidget.scss";

type Props = {
  leaderboard: Array<LeaderBoard>,
  subscribeUpdates: () => void,
  unsubscribeUpdates: () => void,
  playerId: string,
  playerBoosters: {
    triples: number,
    bigWins: number,
    megaWins: number,
  },
  tournamentId: string,
};

export function ReelRaceLeaderboardWidget(props: Props) {
  React.useEffect(() => {
    if (props.tournamentId) {
      props.subscribeUpdates();

      return () => {
        props.unsubscribeUpdates();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tournamentId]);

  const l = R.pipe(
    R.values,
    R.sortBy(R.prop("position"))
  )(props.leaderboard);

  const i = R.findIndex(R.propEq("playerId", props.playerId), l);

  const board = R.uniqBy(
    R.prop("playerId"),
    R.concat(R.take(3, l), R.slice(i - 2, i + 1, l))
  );

  const { playerBoosters } = props;

  return (
    <Flex direction="vertical">
      {playerBoosters && (
        <Flex
          direction="horizontal"
          justify="space-between"
          className="u-padding-x--md t-color-plum"
        >
          <Flex direction="vertical" align="center">
            <div className="t-color-turquoise t-border t-border--current-color t-border-r--circle u-padding">
              <TripleWinIcon size="md" className="t-color-plum" />
            </div>
            <Text
              tag="div"
              size="xs"
              className="c-reel-race-leaderboard-widget-boosters u-font-weight-bold"
            >
              {playerBoosters.triples}
            </Text>
          </Flex>
          <Flex direction="vertical" align="center">
            <div className="t-color-turquoise t-border t-border--current-color t-border-r--circle u-padding">
              <TripleBigWinIcon size="md" className="t-color-plum" />
            </div>
            <Text
              tag="div"
              size="xs"
              className="c-reel-race-leaderboard-widget-boosters u-font-weight-bold"
            >
              {playerBoosters.bigWins}
            </Text>
          </Flex>
          <Flex direction="vertical" align="center">
            <div className="t-color-turquoise t-border t-border--current-color t-border-r--circle u-padding">
              <MegaIcon size="md" className="t-color-plum" />
            </div>
            <Text
              tag="div"
              size="xs"
              className="c-reel-race-leaderboard-widget-boosters u-font-weight-bold"
            >
              {playerBoosters.megaWins}
            </Text>
          </Flex>
        </Flex>
      )}
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
            className="u-text-align-center u-padding"
            style={{ width: "40px" }}
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
