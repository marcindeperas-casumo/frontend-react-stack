import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { mount } from "enzyme";
import { wait, waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import { PluralisableDictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { NOT_FOUND_STRING, LOADING_STRING } from "./utils";
import {
  mocks,
  WORKING_TERM,
  ERROR_TERM,
  REPLACEMENT_TERM,
} from "./__mocks__/termMocks";

describe("<PluralisableDictionaryTerm />", () => {
  test("renders the string for the dictionary key", () => {
    const rendered = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'PluralisableDictionaryTerm' cannot be used as a J... Remove this comment to see the full error message */}
        <PluralisableDictionaryTerm termKey={WORKING_TERM.key} />
      </MockedProvider>
    );

    wait(1000).then(() => {
      expect(rendered.text()).toBe(WORKING_TERM.value);
    });
  });

  test("renders the plural version for the dictionary key when isPlural is truthy", () => {
    const rendered = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'PluralisableDictionaryTerm' cannot be used as a J... Remove this comment to see the full error message */}
        <PluralisableDictionaryTerm
          termKey={WORKING_TERM.key}
          isPlural={true}
        />
      </MockedProvider>
    );

    wait(1000).then(() => {
      expect(rendered.text()).toBe(WORKING_TERM.pluralValue);
    });
  });

  test("renders the LOADING_STRING when translation is loading", () => {
    const renderedSingular = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'PluralisableDictionaryTerm' cannot be used as a J... Remove this comment to see the full error message */}
        <PluralisableDictionaryTerm termKey={WORKING_TERM.key} />
      </MockedProvider>
    );

    const renderedPlural = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'PluralisableDictionaryTerm' cannot be used as a J... Remove this comment to see the full error message */}
        <PluralisableDictionaryTerm
          termKey={WORKING_TERM.key}
          isPlural={true}
        />
      </MockedProvider>
    );

    expect(renderedSingular.text()).toBe(LOADING_STRING);
    expect(renderedPlural.text()).toBe(LOADING_STRING);
  });

  test("renders the NOT_FOUND_STRING when not loading and no data returned", async () => {
    const renderedSingular = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'PluralisableDictionaryTerm' cannot be used as a J... Remove this comment to see the full error message */}
        <PluralisableDictionaryTerm termKey={ERROR_TERM.key} />
      </MockedProvider>
    );

    const renderedPlural = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'PluralisableDictionaryTerm' cannot be used as a J... Remove this comment to see the full error message */}
        <PluralisableDictionaryTerm termKey={ERROR_TERM.key} isPlural={true} />
      </MockedProvider>
    );

    await waitAndUpdateWrapper(renderedSingular);
    await waitAndUpdateWrapper(renderedPlural);
    wait(1000).then(() => {
      expect(renderedSingular.text()).toBe(NOT_FOUND_STRING);
      expect(renderedPlural.text()).toBe(NOT_FOUND_STRING);
    });
  });

  test("replaces any replacement keys in the translation before rendering", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'PluralisableDictionaryTerm' cannot be used as a J... Remove this comment to see the full error message */}
        <PluralisableDictionaryTerm
          termKey={REPLACEMENT_TERM.key}
          replacements={REPLACEMENT_TERM.replacements1}
        />
      </MockedProvider>
    );
    const rendered2 = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'PluralisableDictionaryTerm' cannot be used as a J... Remove this comment to see the full error message */}
        <PluralisableDictionaryTerm
          termKey={REPLACEMENT_TERM.key}
          replacements={REPLACEMENT_TERM.replacements2}
          isPlural={true}
        />
      </MockedProvider>
    );

    await waitAndUpdateWrapper(rendered);
    await waitAndUpdateWrapper(rendered2);
    wait(1000).then(() => {
      expect(rendered.text()).toBe("Liverpool have scored 1 goal");
      expect(rendered2.text()).toBe("Manchester have scored 0 goals");
    });
  });

  test("calls children render props with string to be rendered if children function provided", () => {
    const children = jest.fn().mockReturnValue(null);
    const children2 = jest.fn().mockReturnValue(null);
    const children3 = jest.fn().mockReturnValue(null);

    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <>
          {/* @ts-expect-error ts-migrate(2786) FIXME: 'PluralisableDictionaryTerm' cannot be used as a J... Remove this comment to see the full error message */}
          <PluralisableDictionaryTerm termKey={WORKING_TERM.key}>
            {children}
          </PluralisableDictionaryTerm>
          {/* @ts-expect-error ts-migrate(2786) FIXME: 'PluralisableDictionaryTerm' cannot be used as a J... Remove this comment to see the full error message */}
          <PluralisableDictionaryTerm
            termKey={WORKING_TERM.key}
            isPlural={true}
          >
            {children2}
          </PluralisableDictionaryTerm>
          {/* @ts-expect-error ts-migrate(2786) FIXME: 'PluralisableDictionaryTerm' cannot be used as a J... Remove this comment to see the full error message */}
          <PluralisableDictionaryTerm termKey="not found key">
            {children3}
          </PluralisableDictionaryTerm>
        </>
      </MockedProvider>
    );

    expect(children).toBeCalledWith(LOADING_STRING);
    expect(children2).toBeCalledWith(LOADING_STRING);
    expect(children3).toBeCalledWith(LOADING_STRING);

    wait(1000).then(() => {
      expect(children).toBeCalledWith(WORKING_TERM.value);
      expect(children2).toBeCalledWith(WORKING_TERM.pluralValue);
      expect(children3).toBeCalledWith(NOT_FOUND_STRING);
    });
  });
});
