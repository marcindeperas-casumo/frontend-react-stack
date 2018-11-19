import React from "react";
import { storiesOf } from "@storybook/react";

import info from "Storybook/storybookInfo";
import MustDropJackpot from "Components/MustDropJackpot";
const stories = storiesOf("MustDropJackpot", module);

stories.add(
  "Default",
  () => (
    <MustDropJackpot
      amount="€12,000,000,000"
      description="Pays before 1AM"
      imageSrc="https://cms.casumo.com/wp-content/uploads/2018/11/Full-round-black-container.svg"
    />
  ),
  info({ text: "Default" })
);
