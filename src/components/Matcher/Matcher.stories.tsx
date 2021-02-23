// @flow
import React from "react";
import { select, withKnobs, boolean } from "@storybook/addon-knobs/react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import Matcher from "Components/Matcher";

const stories = storiesOf("Matcher", module);
stories.addDecorator(withKnobs);

const LowerCaseExample = ({ k1 }) => k1.toLowerCase();
const UpperCaseExample = ({ k1 }) => k1.toUpperCase();
const DefaultCaseExample = ({ k1 }) => k1;

const KeyMatcher = ({ ...restProps }) => (
  <Matcher
    getKey={({ typeKey }) => typeKey}
    matchers={{
      upper: UpperCaseExample,
      lower: LowerCaseExample,
      default: DefaultCaseExample,
    }}
    {...restProps}
  />
);
if (isNotChromatic) {
  stories
    .add("Default", () => {
      const value = select("typeKey", ["upper", "lower", "unknown"], "upper");

      return (
        <div>
          <div>
            <h3>Type upper</h3>
            <KeyMatcher typeKey={"upper"} k1="This is type upper example" />
          </div>
          <div>
            <h3>Type lower</h3>
            <KeyMatcher typeKey={"lower"} k1="This is type lower example" />
          </div>
          <div>
            <h3>Type unknown</h3>
            <KeyMatcher typeKey={"xxx"} k1="This is type unknown example" />
          </div>
          <div>
            <h3>Type dynamic</h3>
            <KeyMatcher typeKey={value} k1="This is type dynamic example" />
          </div>
        </div>
      );
    })
    .add("Implement EitherOr", () => {
      const cond = boolean("Is condition true", false);
      const EitherOrMatcher = props => (
        <Matcher
          getKey={({ condition }) => Boolean(condition)}
          matchers={{
            true: () => "true case",
            false: () => "false case",
          }}
          {...props}
        />
      );
      return <EitherOrMatcher condition={cond} />;
    });
}
