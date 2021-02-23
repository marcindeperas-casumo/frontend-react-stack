// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import * as A from "Types/apollo";
import GroupPill from "./GroupPill";

const stories = storiesOf("Sports/GroupPill", module);

const groupA: A.GroupPill_Group = {
  name: "Group A",
  regionCode: "",
};

const groupB: A.GroupPill_Group = {
  name: "Group B",
  regionCode: "SE",
};

stories.add("Default", () => <GroupPill group={groupA} />);

stories.add("Active", () => <GroupPill group={groupA} isActive={true} />);

stories.add("Group with flag", () => <GroupPill group={groupB} />);

stories.add("With onRemove", () => (
  <GroupPill group={groupB} onRemove={action("onRemove")} />
));

stories.add("With onClick", () => (
  <GroupPill
    group={groupB}
    onRemove={action("onRemove")}
    onClick={action("onClick")}
  />
));
