// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import SupportRow from ".";

const stories = storiesOf("SupportRow", module);

stories.add("Default", () => {
  return (
    <>
      <h2>Loading state:</h2>
      <SupportRow translations={{}} loading />

      <h2>Loaded:</h2>
      <SupportRow translations={{}} />
    </>
  );
});
