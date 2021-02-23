// @flow
import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Toggle } from "./Toggle";

const stories = storiesOf("Toggle", module);

stories.add("Default", () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
    <>
      <h2>Basic usage:</h2>
      <Toggle checked={checked1} onChange={value => setChecked1(value)} />
      <p>I am {checked1 ? "checked" : "unchecked"}</p>

      <h2>Short labels: </h2>
      <Toggle
        labelOn="ON"
        labelOff="OFF"
        checked={checked2}
        onChange={value => setChecked2(value)}
      />

      <h2>Long label: </h2>
      <Toggle
        labelOn="That toggle is really ON!"
        labelOff="That one is for sure OFF now!"
        checked={checked3}
        onChange={value => setChecked3(value)}
      />
    </>
  );
});
