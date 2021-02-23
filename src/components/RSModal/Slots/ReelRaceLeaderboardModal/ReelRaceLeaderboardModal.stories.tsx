// @flow
import * as React from "react";
import * as R from "ramda";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import { leaderboard } from "Components/ReelRaceLeaderboard/__mocks__/leaderboard.mock";
import { prizes } from "Components/ReelRaceLeaderboard/__mocks__/prizes.mock";
import { ReelRaceLeaderboardModal } from "./ReelRaceLeaderboardModal";

const newLeaderboard = leaderboard.reduce(
  (acc, curr) => ({
    ...acc,
    [curr.playerId]: curr,
  }),
  {}
);

const Wrapper = ({
  children,
  playerId = "one",
}: {
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
  playerId?: string,
}) => (
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
  "RSModal/Slots/ReelRaceLeaderboardModal",
  module
).addParameters({ noGlobalDecorator: true });

const furtherEntry = R.find(R.propEq("position", 57), leaderboard);

stories.add("Someone won the race", () => {
  return (
    <Wrapper>
      <ReelRaceLeaderboardModal
        acceptModal={action("acceptModal")}
        closeModal={() => {}}
        dismissModal={() => {}}
        t={{}}
        config={{
          input: {
            playerId: "player-123",
            playerName: "Player",
            position: 100,
            points: 0,
            leaderboard: [...leaderboard, ...R.repeat(furtherEntry, 10)],
            prizes,
          },
        }}
      />
    </Wrapper>
  );
});

stories.add("Player won the race", () => {
  const position = 1;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'playerId' does not exist on type 'Record... Remove this comment to see the full error message
  const { playerId, playerName, points } = R.find(
    R.propEq("position", position),
    leaderboard
  );

  return (
    <Wrapper playerId={playerId}>
      <ReelRaceLeaderboardModal
        acceptModal={action("acceptModal")}
        closeModal={() => {}}
        dismissModal={() => {}}
        t={{}}
        config={{
          input: {
            playerId,
            playerName,
            position,
            points,
            leaderboard,
            prizes,
          },
        }}
      />
    </Wrapper>
  );
});

stories.add("Player scored 3rd", () => {
  const position = 3;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'playerId' does not exist on type 'Record... Remove this comment to see the full error message
  const { playerId, playerName, points } = R.find(
    R.propEq("position", position),
    leaderboard
  );

  return (
    <Wrapper playerId={playerId}>
      <ReelRaceLeaderboardModal
        acceptModal={action("acceptModal")}
        closeModal={() => {}}
        dismissModal={() => {}}
        t={{}}
        config={{
          input: {
            playerId,
            playerName,
            position,
            points,
            leaderboard,
            prizes,
          },
        }}
      />
    </Wrapper>
  );
});
