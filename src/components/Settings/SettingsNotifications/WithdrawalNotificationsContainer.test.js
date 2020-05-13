// @flow
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { SettingsNotificationsContainer } from "./SettingsNotificationsContainer";
// import { WithdrawalNotificationsContainer } from "./WithdrawalNotificationsContainer";
import { isCheckboxChecked, actWithClick } from "./MutationContainerTestUtils";
import { withMockQueries } from "./__mocks__/Queries.mock";
import {
  withdrawalNotificationsMock,
  withdrawalNotificationsErrorMock,
} from "./__mocks__/Mutations.mock";

jest.useFakeTimers();

describe("SettingsNotifications - Withdrawal Notifications", () => {
  test("should toggle to false", () => {
    const rendered = mount(
      <MockStore
        queryAddTypename
        queryMocks={withMockQueries(withdrawalNotificationsMock)}
      >
        <SettingsNotificationsContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //initial value should be the one from the query
    // expect(getWithdrawalNotificationsProp(rendered)).toBe(true);
    expect(isCheckboxChecked(rendered)).toBe(true);

    actWithClick(rendered);

    //optimisticResponse kicks in here
    // expect(getWithdrawalNotificationsProp(rendered)).toBe(false);
    expect(isCheckboxChecked(rendered)).toBe(false);

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //actual response from the mutation
    // expect(getWithdrawalNotificationsProp(rendered)).toBe(false);
    expect(isCheckboxChecked(rendered)).toBe(false);
  });

  test("should revert to initial value on error", () => {
    const rendered = mount(
      <MockStore queryMocks={withMockQueries(withdrawalNotificationsErrorMock)}>
        <SettingsNotificationsContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    // expect(getWithdrawalNotificationsProp(rendered)).toBe(true);
    expect(isCheckboxChecked(rendered)).toBe(true);

    actWithClick(rendered);

    // expect(getWithdrawalNotificationsProp(rendered)).toBe(true);
    expect(isCheckboxChecked(rendered)).toBe(true);
  });
});
