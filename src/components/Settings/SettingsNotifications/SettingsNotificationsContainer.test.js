import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { waitAndUpdateWrapper } from "Utils/apolloTestUtils";
import { SettingsNotificationsContainer } from "./SettingsNotificationsContainer";
import {
  withMockQueries,
  playerContactSettingsQueryMock,
  playerContactSettingsQueryErrorMock,
  notificationsLabelsQueryMock,
  notificationsLabelsQueryErrorMock,
} from "./__mocks__/Queries.mock";
import {
  adventurerPublicityMock,
  adventurerPublicityErrorMock,
  contactByPostMock,
  contactByPostErrorMock,
  contactByPhoneMock,
  contactByPhoneErrorMock,
  newsletterSubscriptionMock,
  newsletterSubscriptionErrorMock,
  SMSNewsletterSubscriptionMock,
  SMSNewsletterSubscriptionErrorMock,
} from "./__mocks__/Mutations.mock";

describe("Notifications", () => {
  describe("Component", () => {
    test("should render loader", () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerContactSettingsQueryMock, notificationsLabelsQueryMock]}
        >
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    test("should pass correct player data to children", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerContactSettingsQueryMock, notificationsLabelsQueryMock]}
        >
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(
        JSON.parse(JSON.stringify(rendered.find("Component").prop("player")))
      ).toStrictEqual(playerContactSettingsQueryMock.result.data.player);
    });

    test("should pass correct labels to children", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerContactSettingsQueryMock, notificationsLabelsQueryMock]}
        >
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(
        JSON.parse(JSON.stringify(rendered.find("Component").prop("labels")))
      ).toStrictEqual(notificationsLabelsQueryMock.result.data);
    });

    test("should show error when settings fail to load", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[
            playerContactSettingsQueryErrorMock,
            notificationsLabelsQueryMock,
          ]}
        >
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should show error when labels fail to load", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[
            playerContactSettingsQueryMock,
            notificationsLabelsQueryErrorMock,
          ]}
        >
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });
  });

  describe("Adventurer Publicity", () => {
    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(adventurerPublicityMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      //initial value should be the one from the query
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .adventurerPublic
      ).toBe(true);
      rendered.find("Component").simulate("click");

      rendered.update();
      //optimisticResponse kicks in here
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .adventurerPublic
      ).toBe(false);

      await waitAndUpdateWrapper(rendered);

      //actual response from the mutation
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .adventurerPublic
      ).toBe(false);
    });

    test("should revert to initial value on error", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(adventurerPublicityErrorMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .adventurerPublic
      ).toBe(true);

      rendered.find("Component").simulate("click");

      rendered.update();
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .adventurerPublic
      ).toBe(false);

      await waitAndUpdateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .adventurerPublic
      ).toBe(true);
    });
  });

  describe("Contact By Post", () => {
    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(contactByPostMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      //initial value should be the one from the query
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPost
      ).toBe(true);
      rendered.find("Component").simulate("click");

      rendered.update();
      //optimisticResponse kicks in here
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPost
      ).toBe(false);

      await waitAndUpdateWrapper(rendered);

      //actual response from the mutation
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPost
      ).toBe(false);
    });

    test("should revert to initial value on error", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(contactByPostErrorMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPost
      ).toBe(true);

      rendered.find("Component").simulate("click");

      rendered.update();
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPost
      ).toBe(false);

      await waitAndUpdateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPost
      ).toBe(true);
    });
  });

  describe("Contact By Phone", () => {
    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(contactByPhoneMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      //initial value should be the one from the query
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPhone
      ).toBe(true);
      rendered.find("Component").simulate("click");

      rendered.update();
      //optimisticResponse kicks in here
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPhone
      ).toBe(false);

      await waitAndUpdateWrapper(rendered);

      //actual response from the mutation
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPhone
      ).toBe(false);
    });

    test("should revert to initial value on error", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(contactByPhoneErrorMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPhone
      ).toBe(true);

      rendered.find("Component").simulate("click");

      rendered.update();
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPhone
      ).toBe(false);

      await waitAndUpdateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPhone
      ).toBe(true);
    });
  });

  describe("Newsletter Subscription", () => {
    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(newsletterSubscriptionMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      //initial value should be the one from the query
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToNewsletters
      ).toBe(true);
      rendered.find("Component").simulate("click");

      rendered.update();
      //optimisticResponse kicks in here
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToNewsletters
      ).toBe(false);

      await waitAndUpdateWrapper(rendered);

      //actual response from the mutation
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToNewsletters
      ).toBe(false);
    });

    test("should revert to initial value on error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={withMockQueries(newsletterSubscriptionErrorMock)}
        >
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToNewsletters
      ).toBe(true);

      rendered.find("Component").simulate("click");

      rendered.update();
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToNewsletters
      ).toBe(false);

      await waitAndUpdateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToNewsletters
      ).toBe(true);
    });
  });

  describe("SMS Newsletter Subscription", () => {
    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(SMSNewsletterSubscriptionMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      //initial value should be the one from the query
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToSMSNewsletters
      ).toBe(true);
      rendered.find("Component").simulate("click");

      rendered.update();
      //optimisticResponse kicks in here
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToSMSNewsletters
      ).toBe(false);

      await waitAndUpdateWrapper(rendered);

      //actual response from the mutation
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToSMSNewsletters
      ).toBe(false);
    });

    test("should revert to initial value on error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={withMockQueries(SMSNewsletterSubscriptionErrorMock)}
        >
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToSMSNewsletters
      ).toBe(true);

      rendered.find("Component").simulate("click");

      rendered.update();
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToSMSNewsletters
      ).toBe(false);

      await waitAndUpdateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToSMSNewsletters
      ).toBe(true);
    });
  });
});
