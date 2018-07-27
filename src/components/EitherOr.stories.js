import { number } from "@storybook/addon-knobs";
import { withKnobs } from "@storybook/addon-knobs/react";
import { storiesOf } from "@storybook/react";
import React from "react";
import { boolean } from "../../node_modules/@storybook/addon-knobs/dist/react";
import EitherOr from "./EitherOr";

const stories = storiesOf("EitherOr", module);
stories.addDecorator(withKnobs);

const LowerCaseExample = ({ k1 }) => k1.toLowerCase();
const UpperCaseExample = ({ k1 }) => k1.toUpperCase();

stories
  .add("Default", () => {
    return (
      <EitherOr
        either={LowerCaseExample}
        or={UpperCaseExample}
        condition={() => boolean("Show Either", true)}
        k1="Key 1"
      />
    );
  })
  .add("Props in condition", () => {
    const value = number("SomeValue", 0, {
      range: true,
      min: 0,
      max: 10,
      step: 1,
    });
    return (
      <React.Fragment>
        <EitherOr
          either={LowerCaseExample}
          or={UpperCaseExample}
          condition={({ someValue }) => someValue % 2 === 0}
          k1="foo"
          someValue={value}
        />
      </React.Fragment>
    );
  });
