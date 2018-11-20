import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MediaList from "Components/MediaList";
import mockData from "./__mocks__/jackpotDetails.json";

const stories = storiesOf("MediaList", module);

stories.add(
  "Default",
  () => <MediaList items={mockData} />,
  info({ text: "Default" })
);
