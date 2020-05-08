// @flow
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { SettingsNotificationsContainer } from "./SettingsNotificationsContainer";
import { ContactByPhoneContainer } from "./ContactByPhoneContainer";
import { isCheckboxChecked, actWithClick } from "./MutationContainerTestUtils";
import { withMockQueries } from "./__mocks__/Queries.mock";
import {
  contactByPhoneMock,
  contactByPhoneErrorMock,
} from "./__mocks__/Mutations.mock";

jest.useFakeTimers();

describe("SettingsNotifications - Contact By Phone", () => {
  test("should toggle to false", () => {
    const rendered = mount(
      <MockStore queryMocks={withMockQueries(contactByPhoneMock)}>
        <SettingsNotificationsContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //initial value should be the one from the query
    expect(isCheckboxChecked(rendered, ContactByPhoneContainer)).toBe(true);

    actWithClick(rendered, ContactByPhoneContainer);
    //optimisticResponse kicks in here
    expect(isCheckboxChecked(rendered, ContactByPhoneContainer)).toBe(false);

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //actual response from the mutation
    expect(isCheckboxChecked(rendered, ContactByPhoneContainer)).toBe(false);
  });

  test("should revert to initial value on error", () => {
    const rendered = mount(
      <MockStore queryMocks={withMockQueries(contactByPhoneErrorMock)}>
        <SettingsNotificationsContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    expect(isCheckboxChecked(rendered, ContactByPhoneContainer)).toBe(true);

    actWithClick(rendered, ContactByPhoneContainer);

    expect(isCheckboxChecked(rendered, ContactByPhoneContainer)).toBe(true);
  });
});
