import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import defaultState from "Models/__mocks__/state.mock";
import { normalQuery } from "Components/PlayerValuableList/__mocks__/query.playerValuables.mock";
import { ValuablesPage } from "./ValuablesPage";

const stories = storiesOf("ValuablesPage", module);

stories.add("Default", () => {
  return (
    <div style={{ width: "375px" }}>
      <MockStore state={defaultState} queryMocks={[normalQuery]}>
        <ValuablesPage />
      </MockStore>
    </div>
  );
});
