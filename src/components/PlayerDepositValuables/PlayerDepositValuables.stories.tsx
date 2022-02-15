import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import MockStore from "Components/MockStore";
import { mocks } from "Components/PlayerValuableList/__mocks__/playerValuableListMocks";
import { PlayerDepositValuables } from "Components/PlayerDepositValuables";

const stories = storiesOf("PlayerDepositValuables", module);

stories.add("Default", () => (
  <MockStore>
    <MockedProvider mocks={mocks.mockedDepositValuables}>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
      <PlayerDepositValuables />
    </MockedProvider>
  </MockStore>
));
