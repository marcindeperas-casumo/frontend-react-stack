// @flow
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { SmsSubscriptionContainer } from "./SmsSubscriptionContainer";
import { isCheckboxChecked, actWithClick } from "./MutationContainerTestUtils";
import { SettingsNotificationsSubscribedToSmsNewslettersQuery } from "./SmsSubscription.graphql";
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
        SettingsNotificationsSubscribedToSmsNewslettersQuery,
        "subscribedToSMSNewsletters",
        true
      ),
      // second fetch after mutation due to refetchQueries
      getPlayerSettingQueryMock(
        SettingsNotificationsSubscribedToSmsNewslettersQuery,
        "subscribedToSMSNewsletters",
        false
      ),
    ];
    const rendered = mount(
      <MockStore queryMocks={queryMocks}>
        <SmsSubscriptionContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //initial value should be the one from the query
    expect(isCheckboxChecked(rendered)).toBe(true);

    actWithClick(rendered);
    //optimisticResponse kicks in here
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
      ...SMSNewsletterSubscriptionErrorMock,
      // first fetch before mutation
      getPlayerSettingQueryMock(
        SettingsNotificationsSubscribedToSmsNewslettersQuery,
        "subscribedToSMSNewsletters",
        true
      ),
      // second fetch after mutation due to refetchQueries
      getPlayerSettingQueryMock(
        SettingsNotificationsSubscribedToSmsNewslettersQuery,
        "subscribedToSMSNewsletters",
        false
      ),
    ];
    const rendered = mount(
      <MockStore queryMocks={queryMocks}>
        <SmsSubscriptionContainer />
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
