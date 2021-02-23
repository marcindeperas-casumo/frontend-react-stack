import React from "react";
import { storiesOf } from "@storybook/react";
import { number, boolean } from "@storybook/addon-knobs/react";
import { EitherOr } from "Components/EitherOr";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("EitherOr", module);

const LowerCaseExample = ({ k1 }) => k1.toLowerCase();
const UpperCaseExample = ({ k1 }) => k1.toUpperCase();

if (isNotChromatic) {
  stories
    .add("Default", () => {
      return (
        <EitherOr
          either={LowerCaseExample}
          or={UpperCaseExample}
          condition={() => boolean("Show Either", true)}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ either: ({ k1 }: { k1: any; }) => any; or:... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ either: ({ k1 }: { k1: any; }) => any; or:... Remove this comment to see the full error message
            k1="foo"
            someValue={value}
          />
        </React.Fragment>
      );
    });
}
