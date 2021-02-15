// @flow
import * as React from "react";
import { useTimeoutFn } from "react-use";
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
    const [megaWins, setMegaWins] = React.useState(0);

    useTimeoutFn(() => {
      setMegaWins(1);
    }, 500);

    return <MegaWinsBooster {...props} megaWins={megaWins} />;
  });
} else {
  stories.add("Chromatic", () => {
    const [megaWins, setMegaWins] = React.useState(0);

    useTimeoutFn(() => {
      setMegaWins(1);
    }, 500);

    return (
      <>
        <MegaWinsBooster {...props} megaWins={0} />
        <MegaWinsBooster {...props} megaWins={megaWins} />
      </>
    );
  });
}
