import { useTimeoutFn } from "react-use";
import { storiesOf } from "@storybook/react";
import * as React from "react";
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
    function MegaWinsBoosterStory() {
      const [megaWins, setMegaWins] = React.useState(0);

      useTimeoutFn(() => {
        setMegaWins(1);
      }, 500);

      return <MegaWinsBooster {...props} megaWins={megaWins} />;
    }

    return <MegaWinsBoosterStory />;
  });
} else {
  stories.add("Chromatic", () => {
    function MegaWinsBoosterStory() {
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
    }

    return <MegaWinsBoosterStory />;
  });
}
