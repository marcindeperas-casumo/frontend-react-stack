// @flow
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { ContactByPostContainer } from "./ContactByPostContainer";
import { isCheckboxChecked, actWithClick } from "./MutationContainerTestUtils";
import { getPlayerSettingQueryMock } from "./__mocks__/Queries.mock";
import { SettingsNotificationsContactByPostQuery } from "./ContactByPost.graphql";
import {
  contactByPostMock,
  contactByPostErrorMock,
} from "./__mocks__/Mutations.mock";

jest.useFakeTimers();
jest.mock("Utils/hooks/useTranslationsGql", () => ({
  useTranslationsGql: () => ({
    t: {},
    loading: false,
  }),
}));

describe("SettingsNotifications - Contact By Post", () => {
  test("should toggle to false", () => {
    const queryMocks = [
      ...contactByPostMock,
      // first fetch before mutation
      getPlayerSettingQueryMock(
        SettingsNotificationsContactByPostQuery,
        "contactByPost",
        true
      ),
      // second fetch after mutation due to refetchQueries
      getPlayerSettingQueryMock(
        SettingsNotificationsContactByPostQuery,
        "contactByPost",
        false
      ),
    ];
    const rendered = mount(
      <MockStore queryMocks={queryMocks}>
        <ContactByPostContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    // initial value should be the one from the query
    expect(isCheckboxChecked(rendered)).toBe(true);

    actWithClick(rendered);
    // optimisticResponse kicks in here
    expect(isCheckboxChecked(rendered)).toBe(false);

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //actual response from the mutation
    expect(isCheckboxChecked(rendered)).toBe(false);
  });

  test("should revert to initial value on error", () => {
    const queryMocks = [
      ...contactByPostErrorMock,
      // first fetch before mutation
      getPlayerSettingQueryMock(
        SettingsNotificationsContactByPostQuery,
        "contactByPost",
        true
      ),
      // second fetch after mutation due to refetchQueries
      getPlayerSettingQueryMock(
        SettingsNotificationsContactByPostQuery,
        "contactByPost",
        false
      ),
    ];
    const rendered = mount(
      <MockStore queryMocks={queryMocks}>
        <ContactByPostContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    expect(isCheckboxChecked(rendered)).toBe(true);

    actWithClick(rendered);

    expect(isCheckboxChecked(rendered)).toBe(true);
  });
});
