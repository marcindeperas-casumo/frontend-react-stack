import { storiesOf } from "@storybook/react";
import React from "react";
import MockStore from "Components/MockStore";
import { ReelRaceScheduleCard } from "./ReelRaceScheduleCard";
import reelRaceMock from "./__mocks__/reelRace.json";
import tMock from "./__mocks__/t.json";

const stories = storiesOf("ReelRaceScheduleCard", module);

stories.add("Default", () => {
  return (
    <MockStore>
      <div className="u-content-width--tablet-landscape">
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: string; game: { id: string; name: stri... Remove this comment to see the full error message */}
        <ReelRaceScheduleCard reelRace={reelRaceMock} t={tMock} />
      </div>
    </MockStore>
  );
});

stories.add("Expanded", () => {
  return (
    <MockStore>
      <div className="u-content-width--tablet-landscape">
        <ReelRaceScheduleCard
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: string; game: { id: string; name: stri... Remove this comment to see the full error message
          reelRace={reelRaceMock}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ show_prizes_button: string; hide_prizes_bu... Remove this comment to see the full error message
          t={tMock}
          expanded={true}
        />
      </div>
    </MockStore>
  );
});

const promotedReelRace = {
  ...reelRaceMock,
  promoted: true,
};

stories.add("Promoted", () => {
  return (
    <MockStore>
      <div className="u-content-width--tablet-landscape">
        <ReelRaceScheduleCard
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ promoted: boolean; id: string; game: { id:... Remove this comment to see the full error message
          reelRace={promotedReelRace}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ show_prizes_button: string; hide_prizes_bu... Remove this comment to see the full error message
          t={tMock}
          expanded={true}
        />
      </div>
    </MockStore>
  );
});
