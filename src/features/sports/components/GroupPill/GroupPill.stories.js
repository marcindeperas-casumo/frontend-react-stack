// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import GroupPill from "./GroupPill";

const stories = storiesOf("Sports/GroupPill", module);

const groupA: GroupPill_Group = {
  name: "Group A",
  regionCode: "",
};

const groupB: GroupPill_Group = {
  name: "Group B",
  regionCode: "SE",
};

stories.add(
  "Default",
  () => <GroupPill group={groupA} />,
  info({ text: "Default" })
);

stories.add(
  "Active",
  () => <GroupPill group={groupA} isActive={true} />,
  info({ text: "Active" })
);

stories.add(
  "Group with flag",
  () => <GroupPill group={groupB} />,
  info({ text: "Group with Emoji" })
);

stories.add(
  "With onRemove",
  () => <GroupPill group={groupB} onRemove={action("onRemove")} />,
  info({ text: "With onRemove" })
);

stories.add(
  "With onClick",
  () => (
    <GroupPill
      group={groupB}
      onRemove={action("onRemove")}
      onClick={action("onClick")}
    />
  ),
  info({ text: "With onClick" })
);
