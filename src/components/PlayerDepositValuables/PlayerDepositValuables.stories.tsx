import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import MockStore from "Components/MockStore";
import { mocks } from "Components/PlayerValuableList/__mocks__/playerValuableListMocks";
import { PlayerDepositValuables } from "Components/PlayerDepositValuables";
import { PlayerDepositValuablesWithModal } from "Components/PlayerDepositValuables/PlayerDepositValuablesWithModal";

const stories = storiesOf("PlayerDepositValuables", module);

stories.add("Default", () => (
  <MockStore>
    <MockedProvider mocks={mocks.mockedDepositValuables}>
      <PlayerDepositValuables />
    </MockedProvider>
  </MockStore>
));

stories.add("Default - With modal", () => {
  return (
    <MockStore>
      <MockedProvider mocks={mocks.mockedDepositValuables}>
        <PlayerDepositValuablesWithModal
          isOpen={true}
          onClose={() => {}}
        ></PlayerDepositValuablesWithModal>
      </MockedProvider>
    </MockStore>
  );
});
