// @flow
import React from "react";
import { mount } from "enzyme";
import { wait } from "Utils/apolloTestUtils";
import MockStore from "Components/MockStore";
import { WithdrawalNotificationsContainer } from "./WithdrawalNotificationsContainer";
import { isCheckboxChecked, actWithClick } from "./MutationContainerTestUtils";
import { PLAYER_CONTACT_SETTINGS_QUERY } from "./PlayerContactSettingsQuery";
import { getPlayerSettingQueryMock } from "./__mocks__/Queries.mock";
import {
  withdrawalNotificationsMock,
  withdrawalNotificationsErrorMock,
} from "./__mocks__/Mutations.mock";

jest.useFakeTimers();
jest.mock("Utils/hooks/useTranslationsGql", () => ({
  useTranslationsGql: () => ({
    t: {},
    loading: false,
  }),
}));

describe("SettingsNotifications - Withdrawal Notifications", () => {
  test("should toggle to false", () => {
    const queryMocks = [
      ...withdrawalNotificationsMock,
      // first fetch before mutation
      getPlayerSettingQueryMock(
        PLAYER_CONTACT_SETTINGS_QUERY,
        "withdrawalNotifications",
        true
      ),
      // second fetch after mutation due to refetchQueries
      getPlayerSettingQueryMock(
        PLAYER_CONTACT_SETTINGS_QUERY,
        "withdrawalNotifications",
        false
      ),
    ];
    const rendered = mount(
      <MockStore queryMocks={queryMocks}>
        <WithdrawalNotificationsContainer />
      </MockStore>
    );

    wait().then(() => {
      // initial value should be the one from the query
      expect(isCheckboxChecked(rendered)).toBe(true);
      actWithClick(rendered);
      // optimisticResponse kicks in here
      expect(isCheckboxChecked(rendered)).toBe(false);
      expect(isCheckboxChecked(rendered)).toBe(false);
    });
  });

  test("should revert to initial value on error", () => {
    const queryMocks = [
      ...withdrawalNotificationsErrorMock,
      // first fetch before mutation
      getPlayerSettingQueryMock(
        PLAYER_CONTACT_SETTINGS_QUERY,
        "withdrawalNotifications",
        true
      ),
      // second fetch after mutation due to refetchQueries
      getPlayerSettingQueryMock(
        PLAYER_CONTACT_SETTINGS_QUERY,
        "withdrawalNotifications",
        false
      ),
    ];
    const rendered = mount(
      <MockStore queryMocks={queryMocks}>
        <WithdrawalNotificationsContainer />
      </MockStore>
    );

    wait().then(() => {
      expect(isCheckboxChecked(rendered)).toBe(true);
      actWithClick(rendered);
      expect(isCheckboxChecked(rendered)).toBe(true);
    });
  });
});
