/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import CompetitionPillsList from "./";
import competitions from "./__mocks__/competitions";

const stories = storiesOf("Sports/CompetitionPillList", module);

stories.add("Basic", () => {
  return <CompetitionPillsList competitions={competitions} />;
});

stories.add("With onRemove", () => (
  <CompetitionPillsList
    competitions={competitions}
    onRemove={action("onRemove")}
  />
));

stories.add("With onAdd", () => (
  <CompetitionPillsList
    competitions={competitions}
    onRemove={action("onRemove")}
    onAdd={action("onAdd")}
  />
));

stories.add("With onClick", () => (
  <CompetitionPillsList
    competitions={competitions}
    onRemove={action("onRemove")}
    onAdd={action("onAdd")}
    onClick={action("onClick")}
  />
));

stories.add("With isActive", () => (
  <CompetitionPillsList
    competitions={competitions}
    onRemove={action("onRemove")}
    onAdd={action("onAdd")}
    onClick={action("onClick")}
    isActive={g => g.id === 1000094981}
  />
));
