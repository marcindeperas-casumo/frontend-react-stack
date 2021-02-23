// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ContentMediaList } from "Components/ContentMediaList";
import mockData from "./__mocks__/jackpotDetails.json";

const stories = storiesOf("ContentMediaList", module);

stories.add("Default", () => <ContentMediaList items={mockData} />);
