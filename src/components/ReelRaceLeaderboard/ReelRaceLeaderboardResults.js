// @flow
import * as React from "react";
import * as R from "ramda";
import List from "@casumo/cmp-list";
import * as A from "Types/apollo";
import { ReelRaceLeaderboardListEntry } from "./ReelRaceLeaderboardListEntry";

import "./ReelRaceLeaderboard.scss";

type Props = {
  leaderboard: Array<A.ReelRaceWidgetQuery_reelRaces_leaderboard>,
  playerId: string,
  size?: number,
  prices: Array<string>,
};

const LEADERBOARD_SIZE = 25;

export const getPrice = (position: number, prices: Array<string>) =>
  prices[position - 1] || null;

export function ReelRaceLeaderboardResults({
  playerId,
  leaderboard,
  size = LEADERBOARD_SIZE,
  prices = [],
}: Props) {
  const sorted = R.sortBy(R.prop("position"))(leaderboard);
  const leaderboardSortedSliced = sorted.slice(0, size);

  return (
    <div>
      <List
        itemSpacing="none"
        items={leaderboardSortedSliced}
        render={({
          points,
          position,
          playerName,
          playerId: playerIdFromLeaderboard,
        }) => (
          <ReelRaceLeaderboardListEntry
            points={points}
            position={position}
            text={playerName}
            price={getPrice(position, prices)}
            highlighted={playerIdFromLeaderboard === playerId}
          />
        )}
      />
    </div>
  );
  // const playerId = useSelector(playerIdSelector);

  // const player: A.ReelRaceWidgetQuery_reelRaces_leaderboard = R.find(
  //   R.propEq("playerId", playerId)
  // )(board);

  // return (
  //   <Flex direction="vertical">
  //     {player && (
  //       <>
  //         <ReelRacePlayerInfo
  //           spins={player.remainingSpins}
  //           t={props.t}
  //           endTime={props.endTime}
  //         />
  //         <ReelRacePlayerBoosters boosters={player.boosters} />
  //       </>
  //     )}
  //     {board.map(p => (
  //       <Flex
  //         direction="horizontal"
  //         key={p.playerId}
  //         className={classNames({
  //           "u-font-weight-bold t-background-teal-50 t-color-white":
  //             playerId === p.playerId,
  //         })}
  //       >
  //         <Text
  //           tag="div"
  //           size="xs"
  //           className="u-text-align-center u-padding c-reel-race-leaderboard-widget__position"
  //         >
  //           {p.position === 1 ? <TrophyIcon size="sm" /> : p.position}
  //         </Text>
  //         <Text tag="div" size="xs" className="u-width--2/5 u-padding">
  //           {p.playerName}
  //         </Text>
  //         <Text
  //           tag="div"
  //           size="xs"
  //           className="u-width--1/5 u-padding u-text-align-right"
  //         >
  //           {p.points}
  //         </Text>
  //       </Flex>
  //     ))}
  //   </Flex>
  // );
}
