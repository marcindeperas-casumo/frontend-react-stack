// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs/react";
import { MockedProvider } from "@apollo/react-testing";
import { playerSectionsQueryMock } from "Components/Settings/SettingsSections/__mocks__/Queries.mock";
import { PlayOkayBar } from "./PlayOkayBar";

const stories = storiesOf("PlayOkayBar", module);

const jurisdictions = ["MGA", "SGA", "DGA", "DGOJ"];

stories.add("Default", () => {
  const jurisdiction = select("Jurisdiction", jurisdictions, "MGA");

  return (
    <MockedProvider mocks={[playerSectionsQueryMock]}>
      <PlayOkayBar jurisdiction={jurisdiction} />
    </MockedProvider>
  );
});
