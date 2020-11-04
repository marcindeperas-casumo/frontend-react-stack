// @flow
import * as React from "react";
import { useInterval } from "react-use";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import { WinsInARowBooster } from "./WinsInARowBooster";

const stories = storiesOf("ReelRaceBoosters/WinsInARowBooster", module);
const className = "t-background-grey-90 u-width--5xlg";
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
    return <WinsInARowBooster {...props} winsInARow={3} />;
  });

  stories.add("step by step", () => {
    const [winsInARow, setWinsInARow] = React.useState(0);

    useInterval(() => {
      setWinsInARow(prevValue => prevValue + 1);
    }, 2000);

    return <WinsInARowBooster {...props} winsInARow={winsInARow % 4} />;
  });
} else {
  stories.add("Chromatic", () => {
    return (
      <>
        <WinsInARowBooster {...props} winsInARow={0} />
        <WinsInARowBooster {...props} winsInARow={1} />
        <WinsInARowBooster {...props} winsInARow={2} />
        <WinsInARowBooster {...props} winsInARow={3} />
      </>
    );
  });
}
