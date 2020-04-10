// @flow
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { SettingsNotifications } from "./SettingsNotifications";
import { SettingsNotificationsContainer } from "./SettingsNotificationsContainer";
import { ContactByPhoneContainer } from "./ContactByPhoneContainer";
import { withMockQueries } from "./__mocks__/Queries.mock";
import {
  contactByPhoneMock,
  contactByPhoneErrorMock,
} from "./__mocks__/Mutations.mock";

jest.useFakeTimers();

const simulateClick = (rendered: any) => {
  rendered
    .find(ContactByPhoneContainer)
    .find("Checkbox")
    .simulate("click");
};

const actWithClick = (rendered: any) => {
  simulateClick(rendered);
  jest.runAllTimers();
  rendered.update();
};

const getContactByPhoneProp = (rendered: any): boolean => {
  return rendered.find(SettingsNotifications).prop("player").details
    .contactSettings.contactByPhone;
};

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
    expect(getContactByPhoneProp(rendered)).toBe(true);

    actWithClick(rendered);
    //optimisticResponse kicks in here
    expect(getContactByPhoneProp(rendered)).toBe(false);

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //actual response from the mutation
    expect(getContactByPhoneProp(rendered)).toBe(false);
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

    expect(getContactByPhoneProp(rendered)).toBe(true);

    actWithClick(rendered);

    expect(getContactByPhoneProp(rendered)).toBe(true);
  });
});
