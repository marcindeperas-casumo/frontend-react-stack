// @flow
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { SettingsNotificationsContainer } from "./SettingsNotificationsContainer";
import { NewsletterSubscriptionContainer } from "./NewsletterSubscriptionContainer";
import { isCheckboxChecked, actWithClick } from "./MutationContainerTestUtils";
import { withMockQueries } from "./__mocks__/Queries.mock";
import {
  newsletterSubscriptionMock,
  newsletterSubscriptionErrorMock,
} from "./__mocks__/Mutations.mock";

jest.useFakeTimers();

describe("SettingsNotifications - Newsletter Subscription", () => {
  test("should toggle to false", () => {
    const rendered = mount(
      <MockStore queryMocks={withMockQueries(newsletterSubscriptionMock)}>
        <SettingsNotificationsContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //initial value should be the one from the query
    expect(isCheckboxChecked(rendered, NewsletterSubscriptionContainer)).toBe(
      true
    );

    actWithClick(rendered, NewsletterSubscriptionContainer);
    //optimisticResponse kicks in here
    expect(isCheckboxChecked(rendered, NewsletterSubscriptionContainer)).toBe(
      false
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    //actual response from the mutation
    expect(isCheckboxChecked(rendered, NewsletterSubscriptionContainer)).toBe(
      false
    );
  });

  test("should revert to initial value on error", () => {
    const rendered = mount(
      <MockStore queryMocks={withMockQueries(newsletterSubscriptionErrorMock)}>
        <SettingsNotificationsContainer />
      </MockStore>
    );

    act(() => {
      jest.runAllTimers();
      rendered.update();
    });

    expect(isCheckboxChecked(rendered, NewsletterSubscriptionContainer)).toBe(
      true
    );

    actWithClick(rendered, NewsletterSubscriptionContainer);

    expect(isCheckboxChecked(rendered, NewsletterSubscriptionContainer)).toBe(
      true
    );
  });
});
