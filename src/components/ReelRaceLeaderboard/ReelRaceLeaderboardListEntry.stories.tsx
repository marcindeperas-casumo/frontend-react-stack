// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ReelRaceLeaderboardListEntry } from "./ReelRaceLeaderboardListEntry";

const stories = storiesOf(
  "ReelRaceLeaderboard/ReelRaceLeaderboardListEntry",
  module
);

stories.add("Default", () => {
  return (
    <div>
      <ReelRaceLeaderboardListEntry
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ position: number; text: string; prize: str... Remove this comment to see the full error message
        position={1}
        text="testme"
        prize="$5"
        showLaurel
        points={1}
        highlighted
      />
      <ReelRaceLeaderboardListEntry
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ position: number; text: string; prize: str... Remove this comment to see the full error message
        position={1}
        text="testme"
        prize="$5"
        showLaurel
        points={5}
      />
      <ReelRaceLeaderboardListEntry
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ position: number; text: string; prize: str... Remove this comment to see the full error message
        position={2}
        text="testme"
        prize="$5"
        showLaurel
        points={44}
      />
      <ReelRaceLeaderboardListEntry
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ position: number; text: string; prize: str... Remove this comment to see the full error message
        position={3}
        text="testme"
        prize="$50"
        showLaurel
        points={273}
      />
      <ReelRaceLeaderboardListEntry
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ position: number; text: string; prize: str... Remove this comment to see the full error message
        position={4}
        text="testme"
        prize="$500"
        showLaurel
        points={2739}
      />
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ position: number; text: string; points: nu... Remove this comment to see the full error message */}
      <ReelRaceLeaderboardListEntry position={5} text="testme" points={273} />
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ position: number; text: string; points: nu... Remove this comment to see the full error message */}
      <ReelRaceLeaderboardListEntry position={6} text="testme" points={2739} />
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ position: number; text: string; points: nu... Remove this comment to see the full error message */}
      <ReelRaceLeaderboardListEntry position={25} text="testme" points={2739} />
      <ReelRaceLeaderboardListEntry
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ position: number; text: string; points: nu... Remove this comment to see the full error message
        position={100}
        text="testme"
        points={2739}
      />
      <h2>Dark bg / inverted</h2>
      <div className="t-background-grey-90">
        <ReelRaceLeaderboardListEntry
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ position: number; text: string; prize: str... Remove this comment to see the full error message
          position={1}
          text="testme"
          prize="$5"
          showLaurel
          points={1}
          highlighted
          inverted
        />
        <ReelRaceLeaderboardListEntry
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ position: number; text: string; prize: str... Remove this comment to see the full error message
          position={1}
          text="testme"
          prize="$5"
          showLaurel
          points={5}
          inverted
        />
      </div>
    </div>
  );
});
