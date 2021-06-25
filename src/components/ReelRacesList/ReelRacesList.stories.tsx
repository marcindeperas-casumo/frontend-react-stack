import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import MockStore from "Components/MockStore";
import { ReelRacesList } from "./ReelRacesList";
import { reelRacesListQueryMock } from "./__mocks__/reelRacesStore";
const stories = storiesOf("ReelRacesList", module);

stories.add("ReelRacesList", () => (
  <MockStore>
    <MockedProvider mocks={[reelRacesListQueryMock]}>
      <ReelRacesList
        reelRaces={reelRacesListQueryMock.result.data.reelRaces as any}
        title={reelRacesListQueryMock.result.data.title}
        seeMore={reelRacesListQueryMock.result.data.seeMore}
      />
    </MockedProvider>
  </MockStore>
));
