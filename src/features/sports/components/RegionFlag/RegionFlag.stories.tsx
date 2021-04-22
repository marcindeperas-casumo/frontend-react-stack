import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
import React from "react";
import { RegionFlag } from "./RegionFlag";

const stories = storiesOf("Sports/RegionFlag", module);

const regionCodes = [
  "BR",
  "SE",
  "GB-ENG",
  "GB-WLS",
  "GB-SCT",
  "US",
  "EU",
  "WORLD",
];

stories.add("Default size", () => (
  <>
    {regionCodes.map(code => (
      <RegionFlag regionCode={code} key={code} />
    ))}
  </>
));

stories.add("Adjustable size", () => (
  <>
    {regionCodes.map(code => (
      <RegionFlag regionCode={code} size={number("Size", 32)} key={code} />
    ))}
  </>
));
