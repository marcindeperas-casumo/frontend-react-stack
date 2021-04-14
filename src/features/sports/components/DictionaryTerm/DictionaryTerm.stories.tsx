import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import { text, number } from "@storybook/addon-knobs";
import React from "react";
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

  // @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message
  stories.add("Default", () => <DictionaryTerm termKey={WORKING_TERM.key} />);

  stories.add("With replacements", () => (
    // @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message
    <DictionaryTerm
      termKey={REPLACEMENT_TERM.key}
      replacements={{
        teamName: text("Team name", "{teamName}"),
        goalCount: number("Goal count", "{goalCount}"),
      }}
    />
  ));
}
