// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import { MegaWinsBooster } from "./MegaWinsBooster";

const stories = storiesOf("ReelRaceBoosters/MegaWinsBooster", module);
const className = "t-background-grey-90 u-width--5xlg";
const props = {
  className,
};

if (isNotChromatic) {
  stories.add("no mega wins", () => {
    return <MegaWinsBooster {...props} megaWins={0} />;
  });

  stories.add("mega win", () => {
    return <MegaWinsBooster {...props} megaWins={1} />;
  });
} else {
  stories.add("Chromatic", () => {
    return (
      <>
        <MegaWinsBooster {...props} megaWins={0} />
        <MegaWinsBooster {...props} megaWins={1} />
      </>
    );
  });
}
