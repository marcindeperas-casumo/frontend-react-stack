import React from "react";
import { mount } from "enzyme";
import { wait } from "Utils/apolloTestUtils";
import MockStore from "Components/MockStore";
import { ContactByPhoneContainer } from "./ContactByPhoneContainer";
import { SettingsNotificationsContactByPhoneQuery } from "./ContactByPhone.graphql";
import { actWithClick, isCheckboxChecked } from "./MutationContainerTestUtils";
import { getPlayerSettingQueryMock } from "./__mocks__/Queries.mock";
import {
  contactByPhoneMock,
  contactByPhoneErrorMock,
} from "./__mocks__/Mutations.mock";

jest.useFakeTimers();
jest.mock("Utils/hooks/useTranslationsGql", () => ({
  useTranslationsGql: () => ({
    t: {},
    loading: false,
  }),
}));

describe("SettingsNotifications - Contact By Phone", () => {
  test("should toggle to false", () => {
    const queryMocks = [
      ...contactByPhoneMock,
      // first fetch before mutation
      getPlayerSettingQueryMock(
        SettingsNotificationsContactByPhoneQuery,
        "contactByPhone",
        true
      ),
      // second fetch after mutation due to refetchQueries
      getPlayerSettingQueryMock(
        SettingsNotificationsContactByPhoneQuery,
        "contactByPhone",
        false
      ),
    ];
    const rendered = mount(
      <MockStore queryMocks={queryMocks}>
        <ContactByPhoneContainer />
      </MockStore>
    );

    wait().then(() => {
      // initial value should be the one from the query
      expect(isCheckboxChecked(rendered)).toBe(true);
      actWithClick(rendered);
      // optimisticResponse kicks in here
      expect(isCheckboxChecked(rendered)).toBe(false);
      // actual response from the mutation
      expect(isCheckboxChecked(rendered)).toBe(false);
    });
  });

  test("should revert to initial value on error", () => {
    const queryMocks = [
      ...contactByPhoneErrorMock,
      // first fetch before mutation
      getPlayerSettingQueryMock(
        SettingsNotificationsContactByPhoneQuery,
        "contactByPhone",
        true
      ),
      // second fetch after mutation due to refetchQueries
      getPlayerSettingQueryMock(
        SettingsNotificationsContactByPhoneQuery,
        "contactByPhone",
        false
      ),
    ];
    const rendered = mount(
      <MockStore queryMocks={queryMocks}>
        <ContactByPhoneContainer />
      </MockStore>
    );

    wait().then(() => {
      // initial value should be the one from the query
      expect(isCheckboxChecked(rendered)).toBe(true);

      actWithClick(rendered);

      // the same state because mutation failed
      expect(isCheckboxChecked(rendered)).toBe(true);
    });
  });
});
