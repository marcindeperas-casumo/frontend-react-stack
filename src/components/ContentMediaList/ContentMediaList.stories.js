// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import ContentMediaList from "Components/ContentMediaList";
import mockData from "./__mocks__/jackpotDetails.json";

const stories = storiesOf("ContentMediaList", module);

stories.add(
  "Default",
  () => <ContentMediaList items={mockData} />,
  info({ text: "Default" })
);
