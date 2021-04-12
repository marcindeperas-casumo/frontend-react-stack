import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Checkbox } from "./Checkbox";

const stories = storiesOf("Checkbox", module);

stories.add("Default", () => {
  function CheckboxStory() {
    const [checked, setChecked] = React.useState(false);

    return (
      <>
        <Checkbox checked={checked} onChange={setChecked} />
        <p>I am {checked ? "checked" : "unchecked"}</p>
      </>
    );
  }

  return <CheckboxStory />;
});
