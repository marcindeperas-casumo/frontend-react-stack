/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import competitions from "./__mocks__/competitions";
import CompetitionPillsList from "./";

const stories = storiesOf("Sports/CompetitionPillList", module);

stories.add(
  "Basic",
  () => <CompetitionPillsList competitions={competitions} />,
  info({ text: "Basic" })
);

stories.add(
  "With onRemove",
  () => (
    <CompetitionPillsList
      competitions={competitions}
      onRemove={action("onRemove")}
    />
  ),
  info({ text: "With onRemove" })
);

stories.add(
  "With onAdd",
  () => (
    <CompetitionPillsList
      competitions={competitions}
      onRemove={action("onRemove")}
      onAdd={action("onAdd")}
    />
  ),
  info({ text: "With onAdd" })
);

stories.add(
  "With onClick",
  () => (
    <CompetitionPillsList
      competitions={competitions}
      onRemove={action("onRemove")}
      onAdd={action("onAdd")}
      onClick={action("onClick")}
    />
  ),
  info({ text: "With onClick" })
);

stories.add(
  "With isActive",
  () => (
    <CompetitionPillsList
      competitions={competitions}
      onRemove={action("onRemove")}
      onAdd={action("onAdd")}
      onClick={action("onClick")}
      isActive={g => g.id % 2 === 0}
    />
  ),
  info({ text: "With isActive" })
);
