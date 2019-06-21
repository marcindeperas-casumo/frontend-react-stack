// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "react-apollo/test-utils";
import { text, number } from "@storybook/addon-knobs/react";
import isNotChromatic from "Storybook/isNotChromatic";
import { DictionaryTerm } from "./DictionaryTerm";
import { mocks, WORKING_TERM, REPLACEMENT_TERM } from "./__mocks__/termMocks";

const stories = storiesOf("Sports/DictionaryTerm/DictionaryTerm", module);

if (isNotChromatic) {
  stories.addDecorator(story => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {story()}
    </MockedProvider>
  ));

  stories.add("Default", () => <DictionaryTerm termKey={WORKING_TERM.key} />);

  stories.add("With replacements", () => (
    <DictionaryTerm
      termKey={REPLACEMENT_TERM.key}
      replacements={{
        teamName: text("Team name", "{teamName}"),
        goalCount: number("Goal count", "{goalCount}"),
      }}
    />
  ));
}
