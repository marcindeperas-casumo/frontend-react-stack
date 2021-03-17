import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { mount } from "enzyme";
import { wait, waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import { DictionaryTerm } from "./DictionaryTerm";
import { NOT_FOUND_STRING, LOADING_STRING } from "./utils";
import {
  mocks,
  WORKING_TERM,
  ERROR_TERM,
  REPLACEMENT_TERM,
} from "./__mocks__/termMocks";

describe("<DictionaryTerm />", () => {
  test("renders the string for the dictionary key", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm termKey={WORKING_TERM.key} />
      </MockedProvider>
    );

    await waitAndUpdateWrapper(rendered);
    wait(1000).then(() => {
      expect(rendered.text()).toBe(WORKING_TERM.value);
    });
  });

  test("renders the LOADING_STRING when translation is loading", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm termKey={WORKING_TERM.key} />
      </MockedProvider>
    );

    await waitAndUpdateWrapper(rendered);
    wait(1000).then(() => {
      expect(rendered.text()).toBe(LOADING_STRING);
    });
  });

  test("renders the NOT_FOUND_STRING when not loading and no data returned", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm termKey={ERROR_TERM.key} />
      </MockedProvider>
    );

    await waitAndUpdateWrapper(rendered);
    wait(1000).then(() => {
      expect(rendered.text()).toBe(NOT_FOUND_STRING);
    });
  });

  test("replaces any replacement keys in the translation before rendering", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm
          termKey={REPLACEMENT_TERM.key}
          replacements={REPLACEMENT_TERM.replacements1}
        />
      </MockedProvider>
    );
    const rendered2 = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm
          termKey={REPLACEMENT_TERM.key}
          replacements={REPLACEMENT_TERM.replacements2}
        />
      </MockedProvider>
    );

    await waitAndUpdateWrapper(rendered);
    await waitAndUpdateWrapper(rendered2);
    wait(1000).then(() => {
      expect(rendered.text()).toBe("Liverpool have scored 1 goal");
      expect(rendered2.text()).toBe("Manchester have scored 0 goal");
    });
  });

  test("leaves undefined/null replacements untouched", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm
          termKey={REPLACEMENT_TERM.key}
          replacements={{
            teamName: "No goals",
          }}
        />
      </MockedProvider>
    );

    await waitAndUpdateWrapper(rendered);
    wait(1000).then(() => {
      expect(rendered.text()).toBe("No goals have scored {goalCount} goal");
    });
  });

  test("calls children render props with string to be rendered if children function provided", () => {
    const children = jest.fn().mockReturnValue(null);
    const children2 = jest.fn().mockReturnValue(null);

    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <>
          {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
          <DictionaryTerm termKey={WORKING_TERM.key}>{children}</DictionaryTerm>
          {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
          <DictionaryTerm termKey="not found key">{children2}</DictionaryTerm>
        </>
      </MockedProvider>
    );

    expect(children).toBeCalledWith(LOADING_STRING);
    expect(children2).toBeCalledWith(LOADING_STRING);

    wait(1000).then(() => {
      expect(children).toBeCalledWith(WORKING_TERM.value);
      expect(children2).toBeCalledWith(NOT_FOUND_STRING);
    });
  });
});
