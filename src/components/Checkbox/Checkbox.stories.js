// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const stories = storiesOf("Checkbox", module);

stories.add("Default", () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <>
      <Checkbox checked={checked} onChange={value => setChecked(value)} />
      <p>I am {checked ? "checked" : "unchecked"}</p>
    </>
  );
});
