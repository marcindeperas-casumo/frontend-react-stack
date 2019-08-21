// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { HistoryView } from "./HistoryView";
import cms from "./__mocks__/cms";

const stories = storiesOf("RSModal/T&C", module);

stories.add("HistoryView", () => {
  return (
    <HistoryView
      t={cms}
      setVersion={x => {}}
      formatVersion={x => x.toString()}
      formatVersionDate={(a, b) => b}
    />
  );
});
