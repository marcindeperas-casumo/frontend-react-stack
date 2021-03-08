import { storiesOf } from "@storybook/react";
import { text, select, number } from "@storybook/addon-knobs/react";
import * as React from "react";
import { TextInput } from "./TextInput";

const stories = storiesOf("TextInput", module);

stories.add("Default", () => {
  function TextInputStory() {
    const inputProps = useInput();
    return (
      <TextInput
        currencySign={select("Currency Sign", ["€", ""], "€")}
        type={select("Type", ["text", "number"], "text")}
        placeholder={text("Placeholder")}
        min={number("Min", 0)}
        max={number("Max", 10)}
        {...inputProps}
      />
    );
  }

  return <TextInputStory />;
});

function useInput(initialValue?: string | undefined) {
  const [value, setValue] = React.useState(initialValue);

  return {
    value,
    onChange: (event: any) => {
      setValue(event.target.value);
    },
  };
}
