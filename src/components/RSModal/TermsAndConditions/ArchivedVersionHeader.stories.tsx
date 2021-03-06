import { storiesOf } from "@storybook/react";
import * as React from "react";
import { ArchivedVersionHeader } from "./ArchivedVersionHeader";
import cms from "./__mocks__/cms";

const stories = storiesOf("RSModal/T&C", module);

stories.add("ArchivedVersionHeader", () => {
  return (
    <ArchivedVersionHeader title={cms.note_version_old} onClick={() => {}} />
  );
});
