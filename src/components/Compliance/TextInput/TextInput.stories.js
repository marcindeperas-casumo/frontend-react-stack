// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { TextInput } from "./TextInput";

const stories = storiesOf("TextInput", module);

stories.add("Default", () => {
  const inputProps = useInput();
  return <TextInput label="Daily limit" currencySign="€" {...inputProps} />;
});

function useInput(initialValue?: ?string) {
  const [value, setValue] = React.useState(initialValue);

  return {
    value,
    onChange: (event: any) => {
      setValue(event.target.value);
    },
  };
}
