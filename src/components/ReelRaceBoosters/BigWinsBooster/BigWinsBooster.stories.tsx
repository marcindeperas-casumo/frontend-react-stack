import { useInterval, useTimeoutFn } from "react-use";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
import { BigWinsBooster } from "./BigWinsBooster";

const stories = storiesOf("ReelRaceBoosters/BigWinsBooster", module);
const className = "bg-grey-90 u-width--5xlg";
const props = {
  className,
};

if (isNotChromatic) {
  stories.add("no big wins", () => {
    return <BigWinsBooster {...props} bigWins={0} />;
  });

  stories.add("1 big win", () => {
    return <BigWinsBooster {...props} bigWins={1} />;
  });

  stories.add("2 big wins", () => {
    function BigWinsBoosterTwoWinsStory() {
      const [twoBigWins, setBigWins] = React.useState(1);

      useTimeoutFn(() => {
        setBigWins(2);
      }, 500);

      return <BigWinsBooster {...props} bigWins={twoBigWins} />;
    }

    return <BigWinsBoosterTwoWinsStory />;
  });

  stories.add("3 big wins", () => {
    return <BigWinsBooster {...props} bigWins={3} />;
  });

  stories.add("step by step", () => {
    function BigWinsBoosterStepByStepStory() {
      const [bigWins, setBigWins] = React.useState(0);

      useInterval(() => {
        setBigWins(prevValue => prevValue + 1);
      }, 3000);

      return <BigWinsBooster {...props} bigWins={bigWins} />;
    }

    return <BigWinsBoosterStepByStepStory />;
  });
} else {
  stories.add("Chromatic", () => {
    function BigWinsBoosterStory() {
      const [twoBigWins, setBigWins] = React.useState(1);

      useTimeoutFn(() => {
        setBigWins(2);
      }, 500);

      return (
        <>
          <BigWinsBooster {...props} bigWins={0} />
          <BigWinsBooster {...props} bigWins={1} />
          <BigWinsBooster {...props} bigWins={twoBigWins} />
        </>
      );
    }

    return <BigWinsBoosterStory />;
  });
}
