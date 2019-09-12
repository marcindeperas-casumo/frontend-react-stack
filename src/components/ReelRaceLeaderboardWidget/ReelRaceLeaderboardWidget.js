// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import * as R from "ramda";
import type { LeaderBoard } from "Models/reelRaceWidget";

type Props = {
  leaderboard: Array<LeaderBoard>,
  subscribeUpdates: () => void,
  unsubscribeUpdates: () => void,
  playerId: string,
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
    R.concat(R.take(3, l), R.slice(i - 3, i + 1, l))
  );

  // eslint-disable-next-line no-console
  console.log(props);

  return (
    <Flex direction="vertical" className="u-width--1/1">
      {board.map(p => (
        <Flex
          direction="horizontal"
          key={p.playerId}
          className={
            props.playerId === p.playerId
              ? "u-font-weight-bold t-background-turquoise t-color-plum"
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
