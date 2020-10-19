// @flow
import * as React from "react";
import { useInterval } from "react-use";
import { storiesOf } from "@storybook/react";
import isNotChromatic from "Storybook/isNotChromatic";
import { BigWinsBooster } from "./BigWinsBooster";

const stories = storiesOf("ReelRaceBoosters/BigWinsBooster", module);
const className = "t-background-grey-90 u-width--5xlg";
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
    return <BigWinsBooster {...props} bigWins={2} />;
  });

  stories.add("3 big wins", () => {
    return <BigWinsBooster {...props} bigWins={3} />;
  });

  stories.add("step by step", () => {
    const [bigWins, setBigWins] = React.useState(0);

    useInterval(() => {
      setBigWins(prevValue => prevValue + 1);
    }, 3000);

    return <BigWinsBooster {...props} bigWins={bigWins} />;
  });
} else {
  stories.add("Chromatic", () => {
    return (
      <>
        <BigWinsBooster {...props} bigWins={0} />
        <BigWinsBooster {...props} bigWins={1} />
        <BigWinsBooster {...props} bigWins={2} />
      </>
    );
  });
}
