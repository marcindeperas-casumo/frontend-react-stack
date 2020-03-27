// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { ReelRacesList } from "./ReelRacesList";
import { reelRacesListQueryMock } from "./__mocks__/reelRacesStore";
const stories = storiesOf("ReelRacesList", module);

stories.add("ReelRacesList", () => (
  <MockedProvider mocks={[reelRacesListQueryMock]}>
    <ReelRacesList
      reelRaces={reelRacesListQueryMock.result.data.reelRaces}
      title={reelRacesListQueryMock.result.data.title}
      seeMore={reelRacesListQueryMock.result.data.seeMore}
    />
  </MockedProvider>
));
