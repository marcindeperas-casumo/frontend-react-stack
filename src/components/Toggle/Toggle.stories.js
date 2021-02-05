// @flow
import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Toggle } from "./Toggle";

const stories = storiesOf("Toggle", module);

stories.add("Default", () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <h2>Basic usage:</h2>
      <Toggle checked={checked} onChange={value => setChecked(value)} />
      <p>I am {checked ? "checked" : "unchecked"}</p>

      <h2>Short labels: </h2>
      <Toggle
        labelOn="ON"
        labelOff="OFF"
        checked={checked}
        onChange={value => setChecked(value)}
      />

      <h2>Long label: </h2>
      <Toggle
        labelOn="That toggle is really ON!"
        labelOff="That one is for sure OFF now!"
        checked={checked}
        onChange={value => setChecked(value)}
      />
    </>
  );
});
