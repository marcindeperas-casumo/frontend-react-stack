// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import valuables from "Components/ValuableRow/__mocks__/Valuable.json";
import { PlayerValuableListVertical } from "./PlayerValuableListVertical";
import translationsMock from "./__mocks__/translations.mock.json";

const stories = storiesOf("PlayerValuableListVertical", module);

stories.add("PlayerValuableListVertical", () => {
  const consumeValuable = () => Promise.resolve();
  const launchGame = () => {};

  return (
    <div style={{ width: "375px" }}>
      <PlayerValuableListVertical
        loading={false}
        valuables={valuables}
        onConsumeValuable={consumeValuable}
        onLaunchGame={launchGame}
        translations={translationsMock}
      />
    </div>
  );
});
