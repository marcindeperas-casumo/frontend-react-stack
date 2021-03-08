import { storiesOf } from "@storybook/react";
import React from "react";
import * as R from "ramda";
import MockStore from "Components/MockStore";
import { SidebarElementWrapper } from "Components/Sidebar/SidebarElementWrapper/SidebarElementWrapper";
import { ReelRaceLeaderboardResults } from "./ReelRaceLeaderboardResults";
import { leaderboard, boosters } from "./__mocks__/leaderboard.mock";
import { prizes } from "./__mocks__/prizes.mock";

const playerId = "a1";
const newLeaderboard = leaderboard.reduce(
  (acc, curr) => ({
    ...acc,
    [curr.playerId]: curr,
  }),
  {}
);

const Wrapper = ({ children }) => (
  <MockStore
    state={{
      handshake: {
        app: {
          "common/composition/session": {
            id: playerId,
          },
        },
      },
      reelRaces: {
        leaderboard: newLeaderboard,
        order: R.pipe(
          R.values,
          R.sortBy(R.prop("position")),
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          R.pluck("playerId")
          // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
        )(newLeaderboard),
      },
    }}
  >
    <>{children}</>
  </MockStore>
);
const stories = storiesOf(
  "ReelRaceLeaderboard/ReelRaceLeaderboardResults",
  module
);

stories.add("Default", () => {
  return (
    <Wrapper>
      <ReelRaceLeaderboardResults
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ leaderboard: { playerId: string; playerNam... Remove this comment to see the full error message
        leaderboard={leaderboard}
        playerId="777"
        prizes={prizes}
      />
    </Wrapper>
  );
});

const PLAYERS_COUNT = 100;
const longLeaderboard = Array(100)
  .fill(1)
  .map((_, i) => {
    if (i + 1 === 35) {
      return null;
    }
    return {
      playerId: `${i + 1}`,
      playerName: `p${i + 1}`,
      position: i + 1,
      points: PLAYERS_COUNT - i,
      remainingSpins: 250,
      boosters,
    };
  })
  .filter(x => x);

const SimulateLeaderboard = () => {
  const [lb, setLb] = React.useState(longLeaderboard);

  React.useEffect(() => {
    setTimeout(() => {
      setLb(s =>
        s.map(x => (x.playerId === "50" ? { ...x, position: 35 } : x))
      );
    }, 6000);
  }, []);

  return (
    <Wrapper>
      <SidebarElementWrapper>
        <ReelRaceLeaderboardResults
          size={lb.length}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ size: number; leaderboard: { playerId: str... Remove this comment to see the full error message
          leaderboard={lb}
          playerId="50"
          forceLaurelPositions={3}
          style={{ height: "400px" }}
          inverted
          fixedRows={3}
          scrollable
        />
      </SidebarElementWrapper>
      <br />
      <SidebarElementWrapper>
        <ReelRaceLeaderboardResults
          size={lb.length}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ size: number; leaderboard: { playerId: str... Remove this comment to see the full error message
          leaderboard={lb}
          playerId="50"
          forceLaurelPositions={3}
          style={{ height: "400px" }}
          inverted={false}
          fixedRows={2}
          scrollable
        />
      </SidebarElementWrapper>
    </Wrapper>
  );
};

stories.add("Drawer", () => {
  return <SimulateLeaderboard />;
});
