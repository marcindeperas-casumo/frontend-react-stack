// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import MockStore from "Components/MockStore";
import { FullscreenView } from "Components/FullscreenView";
import { playerSectionsQueryMock } from "Components/Settings/SettingsSections/__mocks__/Queries.mock";
import { PlayOkayBar } from "./PlayOkayBar";

const stories = storiesOf("PlayOkayBar", module);

const jurisdictions = ["MGA", "SGA", "DGA", "DGOJ"];
const pauseGame = () => Promise.resolve();
const resumeGame = () => {};

stories.add("Default", () => {
  const jurisdiction = select("Jurisdiction", jurisdictions, "MGA");

  return (
    <MockStore queryMocks={[playerSectionsQueryMock]}>
      <FullscreenView>
        <div className="t-background-grey-90">
          <PlayOkayBar
            jurisdiction={jurisdiction}
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ jurisdiction: any; pauseGame: () => Promis... Remove this comment to see the full error message
            pauseGame={pauseGame}
            resumeGame={resumeGame}
          />
        </div>
      </FullscreenView>
    </MockStore>
  );
});
