import { useInterval, useTimeoutFn } from "react-use";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import isNotChromatic from "Storybook/isNotChromatic";
import { WinsInARowBooster } from "./WinsInARowBooster";

const stories = storiesOf("ReelRaceBoosters/WinsInARowBooster", module);
const className = "bg-grey-90 u-width--5xlg";
const props = {
  className,
};

if (isNotChromatic) {
  stories.add("no wins in a row", () => {
    return <WinsInARowBooster {...props} winsInARow={0} />;
  });

  stories.add("1 win in a row", () => {
    return <WinsInARowBooster {...props} winsInARow={1} />;
  });

  stories.add("2 wins in a row", () => {
    return <WinsInARowBooster {...props} winsInARow={2} />;
  });

  stories.add("3 wins in a row", () => {
    function WinsInARowBoosterStory() {
      const [threeWinsInARow, setWinsInARow] = React.useState(2);

      useTimeoutFn(() => {
        setWinsInARow(3);
      }, 500);

      return <WinsInARowBooster {...props} winsInARow={threeWinsInARow} />;
    }

    return <WinsInARowBoosterStory />;
  });

  stories.add("step by step", () => {
    function WinsInARowBoosterStory() {
      const [winsInARow, setWinsInARow] = React.useState(0);

      useInterval(() => {
        setWinsInARow(prevValue => prevValue + 1);
      }, 2000);

      return <WinsInARowBooster {...props} winsInARow={winsInARow % 4} />;
    }

    return <WinsInARowBoosterStory />;
  });
} else {
  stories.add("Chromatic", () => {
    function WinsInARowBoosterStory() {
      const [threeWinsInARow, setWinsInARow] = React.useState(2);

      useTimeoutFn(() => {
        setWinsInARow(3);
      }, 500);

      return (
        <>
          <WinsInARowBooster {...props} winsInARow={0} />
          <WinsInARowBooster {...props} winsInARow={1} />
          <WinsInARowBooster {...props} winsInARow={2} />
          <WinsInARowBooster {...props} winsInARow={threeWinsInARow} />
        </>
      );
    }

    return <WinsInARowBoosterStory />;
  });
}
