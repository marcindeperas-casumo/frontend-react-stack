// @flow
import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import waitForExpect from "wait-for-expect";
import { MockedProvider } from "react-apollo/test-utils";
import { PluralisableDictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { NOT_FOUND_STRING, LOADING_STRING } from "./utils";
import {
  mocks,
  WORKING_TERM,
  ERROR_TERM,
  REPLACEMENT_TERM,
} from "./__mocks__/termMocks";

describe("<PluralisableDictionaryTerm />", () => {
  test("renders the string for the dictionary key", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PluralisableDictionaryTerm termKey={WORKING_TERM.key} />
      </MockedProvider>
    );

    await wait(0);
    rendered.update();

    expect(rendered.text()).toBe(WORKING_TERM.value);
  });

  test("renders the plural version for the dictionary key when isPlural is truthy", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PluralisableDictionaryTerm
          termKey={WORKING_TERM.key}
          isPlural={true}
        />
      </MockedProvider>
    );

    await wait(0);
    rendered.update();

    expect(rendered.text()).toBe(WORKING_TERM.pluralValue);
  });

  test("renders the LOADING_STRING when translation is loading", async () => {
    const renderedSingular = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PluralisableDictionaryTerm termKey={WORKING_TERM.key} />
      </MockedProvider>
    );

    const renderedPlural = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
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
        <PluralisableDictionaryTerm termKey={ERROR_TERM.key} />
      </MockedProvider>
    );

    const renderedPlural = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PluralisableDictionaryTerm termKey={ERROR_TERM.key} isPlural={true} />
      </MockedProvider>
    );

    renderedSingular.update();
    renderedPlural.update();

    await waitForExpect(() => {
      expect(renderedSingular.text()).toBe(NOT_FOUND_STRING);
      expect(renderedPlural.text()).toBe(NOT_FOUND_STRING);
    });
  });

  test("replaces any replacement keys in the translation before rendering", async () => {
    const rendered = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PluralisableDictionaryTerm
          termKey={REPLACEMENT_TERM.key}
          replacements={REPLACEMENT_TERM.replacements1}
        />
      </MockedProvider>
    );
    const rendered2 = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PluralisableDictionaryTerm
          termKey={REPLACEMENT_TERM.key}
          replacements={REPLACEMENT_TERM.replacements2}
          isPlural={true}
        />
      </MockedProvider>
    );

    await wait(0);
    rendered.update();
    rendered2.update();

    expect(rendered.text()).toBe("Liverpool have scored 1 goal");
    expect(rendered2.text()).toBe("Manchester have scored 0 goals");
  });

  test("calls children render props with string to be rendered if children function provided", async () => {
    const children = jest.fn().mockReturnValue(null);
    const children2 = jest.fn().mockReturnValue(null);
    const children3 = jest.fn().mockReturnValue(null);

    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <>
          <PluralisableDictionaryTerm termKey={WORKING_TERM.key}>
            {children}
          </PluralisableDictionaryTerm>
          <PluralisableDictionaryTerm
            termKey={WORKING_TERM.key}
            isPlural={true}
          >
            {children2}
          </PluralisableDictionaryTerm>
          <PluralisableDictionaryTerm termKey="not found key">
            {children3}
          </PluralisableDictionaryTerm>
        </>
      </MockedProvider>
    );

    expect(children).toBeCalledWith(LOADING_STRING);
    expect(children2).toBeCalledWith(LOADING_STRING);
    expect(children3).toBeCalledWith(LOADING_STRING);

    await wait(0);

    expect(children).toBeCalledWith(WORKING_TERM.value);
    expect(children2).toBeCalledWith(WORKING_TERM.pluralValue);
    expect(children3).toBeCalledWith(NOT_FOUND_STRING);
  });
});
