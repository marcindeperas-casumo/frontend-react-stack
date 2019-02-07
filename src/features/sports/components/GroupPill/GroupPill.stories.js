// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import GroupPill from "./GroupPill";

const stories = storiesOf("GroupPill", module);

const groupA: GroupPill_Group = {
  name: "Group A",
  flagEmoji: "",
};

const groupB: GroupPill_Group = {
  name: "Group B",
  flagEmoji: "🇸🇪",
};

stories.add(
  "Default",
  () => <GroupPill group={groupA} />,
  info({ text: "Default" })
);
