// @flow
import React from "react";
import { mount } from "enzyme";
import { wait } from "Utils/apolloTestUtils";
import MockStore from "Components/MockStore";
import { NewsletterSubscriptionContainer } from "./NewsletterSubscriptionContainer";
import { isCheckboxChecked, actWithClick } from "./MutationContainerTestUtils";
import { getPlayerSettingQueryMock } from "./__mocks__/Queries.mock";
import { SettingsNotificationsSubscribedToNewslettersQuery } from "./NewsletterSubscription.graphql";
import {
  newsletterSubscriptionMock,
  newsletterSubscriptionErrorMock,
} from "./__mocks__/Mutations.mock";

jest.useFakeTimers();
jest.mock("Utils/hooks/useTranslationsGql", () => ({
  useTranslationsGql: () => ({
    t: {},
    loading: false,
  }),
}));

describe("SettingsNotifications - Newsletter Subscription", () => {
  test("should toggle to false", () => {
    const queryMocks = [
      ...newsletterSubscriptionMock,
      // first fetch before mutation
      getPlayerSettingQueryMock(
        SettingsNotificationsSubscribedToNewslettersQuery,
        "subscribedToNewsletters",
        true
      ),
      // second fetch after mutation due to refetchQueries
      getPlayerSettingQueryMock(
        SettingsNotificationsSubscribedToNewslettersQuery,
        "subscribedToNewsletters",
        false
      ),
    ];
    const rendered = mount(
      <MockStore queryMocks={queryMocks}>
        <NewsletterSubscriptionContainer />
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
      ...newsletterSubscriptionErrorMock,
      // first fetch before mutation
      getPlayerSettingQueryMock(
        SettingsNotificationsSubscribedToNewslettersQuery,
        "subscribedToNewsletters",
        true
      ),
      // second fetch after mutation due to refetchQueries
      getPlayerSettingQueryMock(
        SettingsNotificationsSubscribedToNewslettersQuery,
        "subscribedToNewsletters",
        false
      ),
    ];
    const rendered = mount(
      <MockStore queryMocks={queryMocks}>
        <NewsletterSubscriptionContainer />
      </MockStore>
    );

    wait().then(() => {
      expect(isCheckboxChecked(rendered)).toBe(true);
      actWithClick(rendered);
      expect(isCheckboxChecked(rendered)).toBe(true);
    });
  });
});
