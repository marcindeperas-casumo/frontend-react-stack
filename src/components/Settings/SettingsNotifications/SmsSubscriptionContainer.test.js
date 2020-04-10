// @flow
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { SettingsNotifications } from "./SettingsNotifications";
import { SettingsNotificationsContainer } from "./SettingsNotificationsContainer";
import { SmsSubscriptionContainer } from "./SmsSubscriptionContainer";
import { withMockQueries } from "./__mocks__/Queries.mock";
import {
  SMSNewsletterSubscriptionMock,
  SMSNewsletterSubscriptionErrorMock,
} from "./__mocks__/Mutations.mock";

jest.useFakeTimers();

const simulateClick = (rendered: any) => {
  rendered
    .find(SmsSubscriptionContainer)
    .find("Checkbox")
    .simulate("click");
};

const actWithClick = (rendered: any) => {
  simulateClick(rendered);
  jest.runAllTimers();
  rendered.update();
};

const getBooleanProp = (rendered: any): boolean => {
  return rendered.find(SettingsNotifications).prop("player").details
    .contactSettings.subscribedToSMSNewsletters;
};

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
    expect(getBooleanProp(rendered)).toBe(true);

    actWithClick(rendered);
    //optimisticResponse kicks in here
    expect(getBooleanProp(rendered)).toBe(false);

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //actual response from the mutation
    expect(getBooleanProp(rendered)).toBe(false);
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

    expect(getBooleanProp(rendered)).toBe(true);

    actWithClick(rendered);

    expect(getBooleanProp(rendered)).toBe(true);
  });
});
