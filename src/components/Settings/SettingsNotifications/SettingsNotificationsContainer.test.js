import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { updateWrapper } from "Utils";
import { withContainer } from "Components/Settings/SettingsNotifications/SettingsNotificationsContainer";
import {
  withMockQueries,
  playerContactSettingsQueryMock,
  playerContactSettingsQueryErrorMock,
  notificationsLabelsQueryMock,
  notificationsLabelsQueryErrorMock,
} from "./__mocks__/Queries.mock";
import {
  withdrawalNotificationsMock,
  withdrawalNotificationsErrorMock,
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

let Component, SettingsNotificationsContainer;
describe("Notifications", () => {
  describe("Component", () => {
    beforeEach(() => {
      Component = props => <div />;
      SettingsNotificationsContainer = () => withContainer(Component);
    });

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });
  });

  describe("Withdrawal Notifications", () => {
    beforeEach(() => {
      Component = props => (
        <input
          type="button"
          onClick={() => props.setWithdrawalNotifications(false)}
        />
      );
      SettingsNotificationsContainer = () => withContainer(Component);
    });

    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(withdrawalNotificationsMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await updateWrapper(rendered);

      //initial value should be the one from the query
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .withdrawalNotifications
      ).toBe(true);
      rendered.find("Component").simulate("click");

      rendered.update();
      //optimisticResponse kicks in here
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .withdrawalNotifications
      ).toBe(false);

      await updateWrapper(rendered);

      //actual response from the mutation
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .withdrawalNotifications
      ).toBe(false);
    });

    test("should revert to initial value on error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={withMockQueries(withdrawalNotificationsErrorMock)}
        >
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await updateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .withdrawalNotifications
      ).toBe(true);

      rendered.find("Component").simulate("click");

      rendered.update();
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .withdrawalNotifications
      ).toBe(false);

      await updateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .withdrawalNotifications
      ).toBe(true);
    });
  });

  describe("Adventurer Publicity", () => {
    beforeEach(() => {
      Component = props => (
        <input
          type="button"
          onClick={() => props.setAdventurerPublicity(false)}
        />
      );
      SettingsNotificationsContainer = () => withContainer(Component);
    });

    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(adventurerPublicityMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .adventurerPublic
      ).toBe(true);
    });
  });

  describe("Contact By Post", () => {
    beforeEach(() => {
      Component = props => (
        <input type="button" onClick={() => props.setContactByPost(false)} />
      );
      SettingsNotificationsContainer = () => withContainer(Component);
    });

    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(contactByPostMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPost
      ).toBe(true);
    });
  });

  describe("Contact By Phone", () => {
    beforeEach(() => {
      Component = props => (
        <input type="button" onClick={() => props.setContactByPhone(false)} />
      );
      SettingsNotificationsContainer = () => withContainer(Component);
    });

    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(contactByPhoneMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPhone
      ).toBe(true);
    });
  });

  describe("Newsletter Subscription", () => {
    beforeEach(() => {
      Component = props => (
        <input
          type="button"
          onClick={() => props.setNewsletterSubscription(false)}
        />
      );
      SettingsNotificationsContainer = () => withContainer(Component);
    });

    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(newsletterSubscriptionMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToNewsletters
      ).toBe(true);
    });
  });

  describe("SMS Newsletter Subscription", () => {
    beforeEach(() => {
      Component = props => (
        <input
          type="button"
          onClick={() => props.setSMSNewsletterSubscription(false)}
        />
      );
      SettingsNotificationsContainer = () => withContainer(Component);
    });

    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(SMSNewsletterSubscriptionMock)}>
          <SettingsNotificationsContainer />
        </MockedProvider>
      );

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

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

      await updateWrapper(rendered);

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToSMSNewsletters
      ).toBe(true);
    });
  });
});
