import { storiesOf } from "@storybook/react";
import * as React from "react";
import MockStore from "Components/MockStore";
import { HistoryView } from "./HistoryView";
import cms, { state } from "./__mocks__/cms";

const stories = storiesOf("RSModal/T&C", module);

const versions = {
  1: "toc.dgoj.v1",
  2: "toc.dgoj.v2",
};

stories.add("HistoryView", () => {
  return (
    <MockStore state={state}>
      <HistoryView
        viewButtonText={cms.button_view_version}
        versions={versions}
        setVersion={x => {}}
        formatVersion={x => x.toString()}
        formatVersionDate={(a, b) => b}
      />
    </MockStore>
  );
});
