import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MustDropJackpotsList from "Components/MustDropJackpotsList";
import MockStore from "Components/MockStore";
import toplist from "Components/MustDropJackpotsList/__mocks__/toplist.json";

const stories = storiesOf("MustDropJackpotsList", module);

const state = {
  schema: {
    cms: toplist,
  },
};

const DefaultStory = () => (
  <MockStore state={state}>
    <MustDropJackpotsList />
  </MockStore>
);

stories.add("Default", DefaultStory, info({ text: "Default" }));
