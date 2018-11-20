import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MustDropJackpotDetailList from "Components/MustDropJackpotDetailList";
import mockData from "./__mocks__/jackpotDetails.json";

const stories = storiesOf("MustDropJackpotDetailList", module);

stories.add(
  "Default",
  () => <MustDropJackpotDetailList jackpotDetails={mockData} />,
  info({ text: "Default" })
);
