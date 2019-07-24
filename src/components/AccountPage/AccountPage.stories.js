import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import defaultState from "Models/__mocks__/state.mock";
import { normalQuery } from "Components/PlayerValuableListHorizontal/__mocks__/query.playerValuables.mock";
import { AccountPage } from "./AccountPage";

const stories = storiesOf("AccountPage", module);

stories.add("Default", () => {
  return (
    <MockStore state={defaultState} queryMocks={[normalQuery]}>
      <AccountPage />
    </MockStore>
  );
});
