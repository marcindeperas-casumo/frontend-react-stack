// @flow
import React from "react";
import { mount } from "enzyme";
import { wait } from "Utils/apolloTestUtils";
import MockStore from "Components/MockStore";
import { SmsSubscriptionContainer } from "./SmsSubscriptionContainer";
import { isCheckboxChecked, actWithClick } from "./MutationContainerTestUtils";
import { PLAYER_CONTACT_SETTINGS_QUERY } from "./PlayerContactSettingsQuery";
import { getPlayerSettingQueryMock } from "./__mocks__/Queries.mock";
import {
  SMSNewsletterSubscriptionMock,
  SMSNewsletterSubscriptionErrorMock,
} from "./__mocks__/Mutations.mock";

jest.useFakeTimers();
jest.mock("Utils/hooks/useTranslationsGql", () => ({
  useTranslationsGql: () => ({
    t: {},
    loading: false,
  }),
}));

describe("SettingsNotifications - SMS Subscription", () => {
  test("should toggle to false", () => {
    const queryMocks = [
      ...SMSNewsletterSubscriptionMock,
      // first fetch before mutation
      getPlayerSettingQueryMock(
        PLAYER_CONTACT_SETTINGS_QUERY,
        "subscribedToSMSNewsletters",
        true
      ),
      // second fetch after mutation due to refetchQueries
      getPlayerSettingQueryMock(
        PLAYER_CONTACT_SETTINGS_QUERY,
        "subscribedToSMSNewsletters",
        false
      ),
    ];
    const rendered = mount(
      <MockStore queryMocks={queryMocks}>
        <SmsSubscriptionContainer />
      </MockStore>
    );

    wait().then(() => {
      //initial value should be the one from the query
      expect(isCheckboxChecked(rendered)).toBe(true);
      actWithClick(rendered);
      //optimisticResponse kicks in here
      expect(isCheckboxChecked(rendered)).toBe(false);
      //actual response from the mutation
      expect(isCheckboxChecked(rendered)).toBe(false);
    });
  });

  test("should revert to initial value on error", () => {
    const queryMocks = [
      ...SMSNewsletterSubscriptionErrorMock,
      // first fetch before mutation
      getPlayerSettingQueryMock(
        PLAYER_CONTACT_SETTINGS_QUERY,
        "subscribedToSMSNewsletters",
        true
      ),
      // second fetch after mutation due to refetchQueries
      getPlayerSettingQueryMock(
        PLAYER_CONTACT_SETTINGS_QUERY,
        "subscribedToSMSNewsletters",
        false
      ),
    ];
    const rendered = mount(
      <MockStore queryMocks={queryMocks}>
        <SmsSubscriptionContainer />
      </MockStore>
    );

    wait().then(() => {
      expect(isCheckboxChecked(rendered)).toBe(true);
      actWithClick(rendered);
      expect(isCheckboxChecked(rendered)).toBe(true);
    });
  });
});
