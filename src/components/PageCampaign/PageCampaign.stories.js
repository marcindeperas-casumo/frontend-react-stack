import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MockStore from "Components/MockStore";
import pageMock from "./__mocks__/cms.campaign.mock";
import PageCampaign from "./";

const stories = storiesOf("PageCampaign", module);
const { slug } = pageMock;
const stateMock = {
  schema: {
    cms: {
      [slug]: pageMock,
    },
  },
};

stories.add(
  "Default",
  () => (
    <MockStore state={stateMock}>
      <PageCampaign />
    </MockStore>
  ),
  info({ text: "Default" })
);
