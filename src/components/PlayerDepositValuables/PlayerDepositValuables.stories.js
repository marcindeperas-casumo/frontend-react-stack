// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { mocks } from "Components/PlayerValuableList/__mocks__/playerValuableListMocks";
import { PlayerDepositValuables } from "Components/PlayerDepositValuables";
import { PlayerDepositValuablesWithModal } from "Components/PlayerDepositValuables/PlayerDepositValuablesWithModal";

const stories = storiesOf("PlayerDepositValuables", module);

stories.add("Default", () => (
  <div style={{ width: "375px" }}>
    <MockedProvider mocks={mocks.mockedDepositValuables}>
      <PlayerDepositValuables />
    </MockedProvider>
  </div>
));

stories.add("Default - With modal", () => {
  return (
    <MockedProvider mocks={mocks.mockedDepositValuables}>
      <PlayerDepositValuablesWithModal
        isOpen={true}
        onClose={() => {}}
      ></PlayerDepositValuablesWithModal>
    </MockedProvider>
  );
});
