import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import CuratedCardLoaderContainer from "Components/CuratedCardLoader";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("CuratedCardLoader", module);
const card = null;

if (isNotChromatic) {
  stories.add(
    "Default",
    () => {
      return (
        <MockStore>
          <CuratedCardLoaderContainer card={card} />
        </MockStore>
      );
    },
    info({ text: "Default" })
  );
}
