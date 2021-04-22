import { storiesOf } from "@storybook/react";
import { number, select } from "@storybook/addon-knobs";
import React from "react";
import { ProgressBar } from "./ProgressBar";

const stories = storiesOf("Progress/ProgressBar", module);

stories.add("Default", () => {
  return <ProgressBar progress={50} />;
});

stories.add("Playground", () => {
  const progress = number("Progress", 25, {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  });
  const fillerClassNames = select(
    "Background color",
    ["bg-grey-20", "bg-grey-5"],
    "bg-grey-20"
  );
  const trackClassNames = select(
    "Foreground color",
    ["bg-yellow-30", "bg-green-30"],
    "bg-yellow-30"
  );

  return (
    <ProgressBar
      progress={progress}
      trackClassNames={trackClassNames}
      fillerClassNames={fillerClassNames}
    />
  );
});
