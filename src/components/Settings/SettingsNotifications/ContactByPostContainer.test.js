// @flow
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { SettingsNotificationsContainer } from "./SettingsNotificationsContainer";
import { ContactByPostContainer } from "./ContactByPostContainer";
import { isCheckboxChecked, actWithClick } from "./MutationContainerTestUtils";
import { withMockQueries } from "./__mocks__/Queries.mock";
import {
  contactByPostMock,
  contactByPostErrorMock,
} from "./__mocks__/Mutations.mock";

jest.useFakeTimers();

describe("SettingsNotifications - Contact By Post", () => {
  test("should toggle to false", () => {
    const rendered = mount(
      <MockStore queryMocks={withMockQueries(contactByPostMock)}>
        <SettingsNotificationsContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //initial value should be the one from the query
    expect(isCheckboxChecked(rendered, ContactByPostContainer)).toBe(true);

    actWithClick(rendered, ContactByPostContainer);
    //optimisticResponse kicks in here
    expect(isCheckboxChecked(rendered, ContactByPostContainer)).toBe(false);

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //actual response from the mutation
    expect(isCheckboxChecked(rendered, ContactByPostContainer)).toBe(false);
  });

  test("should revert to initial value on error", () => {
    const rendered = mount(
      <MockStore queryMocks={withMockQueries(contactByPostErrorMock)}>
        <SettingsNotificationsContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    expect(isCheckboxChecked(rendered, ContactByPostContainer)).toBe(true);

    actWithClick(rendered, ContactByPostContainer);

    expect(isCheckboxChecked(rendered, ContactByPostContainer)).toBe(true);
  });
});
