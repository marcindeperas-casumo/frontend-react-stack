// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { text, number, boolean } from "@storybook/addon-knobs/react";
import { PluralisableDictionaryTerm } from "Features/sports/components/DictionaryTerm";
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

stories.add("Default", () => (
  <PluralisableDictionaryTerm
    termKey={WORKING_TERM.key}
    isPlural={boolean("Is plural", false)}
  />
));

stories.add("With replacements", () => {
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
});
