// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { text, select, number } from "@storybook/addon-knobs/react";
import { TextInput } from "./TextInput";

const stories = storiesOf("TextInput", module);

stories.add("Default", () => {
  const inputProps = useInput();
  return (
    <TextInput
      currencySign={select("Currency Sign", ["€", ""], "€")}
      type={select("Type", ["text", "number"], "text")}
      placeholder={text("Placeholder")}
      min={number("Min", 0)}
      max={number("Max", 10)}
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ value: string; onChange: (event: any) => v... Remove this comment to see the full error message
      label="Daily limit"
      {...inputProps}
    />
  );
});

// @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
function useInput(initialValue?: ?string) {
  const [value, setValue] = React.useState(initialValue);

  return {
    value,
    onChange: (event: any) => {
      setValue(event.target.value);
    },
  };
}
