import React from "react";
import { storiesOf } from "@storybook/react";

import info from "Storybook/storybookInfo";
import MustDropListItem from "Components/MustDropListItem";
const stories = storiesOf("MustDropListItem", module);

stories.add(
  "Default",
  () => (
    <MustDropListItem
      title="Must Drop Jackpot"
      subTitle="This jackpot could drop anytime between 0 and €1,000."
      imageSrc="https://cms.casumo.com/wp-content/uploads/2018/11/Full-round-black-container.svg"
    />
  ),
  info({ text: "Default" })
);
