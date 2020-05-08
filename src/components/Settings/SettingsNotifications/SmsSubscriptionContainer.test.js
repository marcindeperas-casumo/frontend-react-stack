// @flow
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { SettingsNotificationsContainer } from "./SettingsNotificationsContainer";
import { SmsSubscriptionContainer } from "./SmsSubscriptionContainer";
import { isCheckboxChecked, actWithClick } from "./MutationContainerTestUtils";
import { withMockQueries } from "./__mocks__/Queries.mock";
import {
  SMSNewsletterSubscriptionMock,
  SMSNewsletterSubscriptionErrorMock,
} from "./__mocks__/Mutations.mock";

jest.useFakeTimers();

describe("SettingsNotifications - SMS Subscription", () => {
  test("should toggle to false", () => {
    const rendered = mount(
      <MockStore queryMocks={withMockQueries(SMSNewsletterSubscriptionMock)}>
        <SettingsNotificationsContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //initial value should be the one from the query
    expect(isCheckboxChecked(rendered, SmsSubscriptionContainer)).toBe(true);

    actWithClick(rendered, SmsSubscriptionContainer);
    //optimisticResponse kicks in here
    expect(isCheckboxChecked(rendered, SmsSubscriptionContainer)).toBe(false);

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //actual response from the mutation
    expect(isCheckboxChecked(rendered, SmsSubscriptionContainer)).toBe(false);
  });

  test("should revert to initial value on error", () => {
    const rendered = mount(
      <MockStore
        queryMocks={withMockQueries(SMSNewsletterSubscriptionErrorMock)}
      >
        <SettingsNotificationsContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    expect(isCheckboxChecked(rendered, SmsSubscriptionContainer)).toBe(true);

    actWithClick(rendered, SmsSubscriptionContainer);

    expect(isCheckboxChecked(rendered, SmsSubscriptionContainer)).toBe(true);
  });
});
