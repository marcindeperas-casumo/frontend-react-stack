// @flow
import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Toggle } from "./Toggle";

const stories = storiesOf("Toggle", module);

stories.add("Default", () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Toggle checked={checked} onChange={value => setChecked(value)} />
      <p>I am {checked ? "checked" : "unchecked"}</p>
    </>
  );
});
