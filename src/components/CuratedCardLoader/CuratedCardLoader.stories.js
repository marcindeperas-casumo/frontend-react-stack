import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import CuratedCardLoaderContainer from "Components/CuratedCardLoader";

const stories = storiesOf("CuratedCardLoader", module);
const card = null;

stories.add(
  "Default",
  () => <CuratedCardLoaderContainer card={card} />,
  info({ text: "Default" })
);
