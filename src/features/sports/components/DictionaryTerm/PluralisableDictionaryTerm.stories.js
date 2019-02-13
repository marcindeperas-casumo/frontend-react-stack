// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import { MockedProvider } from "react-apollo/test-utils";
import { text, number, boolean } from "@storybook/addon-knobs/react";

import PluralisableDictionaryTerm from "./PluralisableDictionaryTerm";

import { mocks, WORKING_TERM, REPLACEMENT_TERM } from "./__mocks__/termMocks";

const stories = storiesOf(
  "Sports/DictionaryTerm/PluralisableDictionaryTerm",
  module
);

stories.addDecorator(story => (
  <MockedProvider mocks={mocks} addTypename={false}>
    {story()}
  </MockedProvider>
));

stories.add(
  "Default",
  () => (
    <PluralisableDictionaryTerm
      termKey={WORKING_TERM.key}
      isPlural={boolean("Is plural", false)}
    />
  ),
  info({ text: "Default" })
);

stories.add(
  "With replacements",
  () => {
    const teamName = text("Team name", "{teamName}");
    const goalCount = number("Goal count", "{goalCount}");
    return (
      <PluralisableDictionaryTerm
        termKey={REPLACEMENT_TERM.key}
        replacements={{
          teamName,
          goalCount,
        }}
        isPlural={goalCount !== 1}
      />
    );
  },
  info({ text: "Default" })
);
