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
        <PlayOkayBar
          jurisdiction={jurisdiction}
          pauseGame={pauseGame}
          resumeGame={resumeGame}
        />
      </FullscreenView>
    </MockStore>
  );
});
