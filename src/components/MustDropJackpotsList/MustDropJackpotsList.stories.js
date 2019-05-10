// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MustDropJackpotsList from "Components/MustDropJackpotsList";
import MockStore from "Components/MockStore";

const stories = storiesOf("MustDropJackpotsList", module);

const DefaultStory = () => (
  <MockStore>
    <MustDropJackpotsList />
  </MockStore>
);

stories.add("Default", DefaultStory);
