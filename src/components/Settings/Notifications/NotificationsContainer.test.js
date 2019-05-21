import React from "react";
import wait from "waait";
import { mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import { withContainer } from "Components/Settings/Notifications";
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

let Component, NotificationsContainer;
describe("Notifications", () => {
  describe("Component", () => {
    beforeEach(() => {
      Component = props => <div />;
      NotificationsContainer = () => withContainer(Component);
    });

    test("should render loader", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerContactSettingsQueryMock, notificationsLabelsQueryMock]}
        >
          <NotificationsContainer />
        </MockedProvider>
      );

      expect(rendered.find("RowListSkeleton")).toHaveLength(1);
    });

    test("should pass correct player data to children", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerContactSettingsQueryMock, notificationsLabelsQueryMock]}
        >
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(
        JSON.parse(JSON.stringify(rendered.find("Component").prop("player")))
      ).toStrictEqual(playerContactSettingsQueryMock.result.data.player);
    });

    test("should pass correct labels to children", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerContactSettingsQueryMock, notificationsLabelsQueryMock]}
        >
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
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
          <NotificationsContainer />
        </MockedProvider>
      );

      await wait(0);
      rendered.update();
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
          <NotificationsContainer />
        </MockedProvider>
      );

      await wait(0);
      rendered.update();
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
      NotificationsContainer = () => withContainer(Component);
    });

    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(withdrawalNotificationsMock)}>
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

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

      await wait(0);
      rendered.update();

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
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

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

      await wait(0);
      rendered.update();

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
      NotificationsContainer = () => withContainer(Component);
    });

    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(adventurerPublicityMock)}>
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

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

      await wait(0);
      rendered.update();

      //actual response from the mutation
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .adventurerPublic
      ).toBe(false);
    });

    test("should revert to initial value on error", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(adventurerPublicityErrorMock)}>
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

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

      await wait(0);
      rendered.update();

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
      NotificationsContainer = () => withContainer(Component);
    });

    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(contactByPostMock)}>
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

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

      await wait(0);
      rendered.update();

      //actual response from the mutation
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPost
      ).toBe(false);
    });

    test("should revert to initial value on error", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(contactByPostErrorMock)}>
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

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

      await wait(0);
      rendered.update();

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
      NotificationsContainer = () => withContainer(Component);
    });

    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(contactByPhoneMock)}>
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

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

      await wait(0);
      rendered.update();

      //actual response from the mutation
      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .contactByPhone
      ).toBe(false);
    });

    test("should revert to initial value on error", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(contactByPhoneErrorMock)}>
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

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

      await wait(0);
      rendered.update();

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
      NotificationsContainer = () => withContainer(Component);
    });

    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(newsletterSubscriptionMock)}>
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

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

      await wait(0);
      rendered.update();

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
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

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

      await wait(0);
      rendered.update();

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
      NotificationsContainer = () => withContainer(Component);
    });

    test("should toggle to false", async () => {
      const rendered = mount(
        <MockedProvider mocks={withMockQueries(SMSNewsletterSubscriptionMock)}>
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

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

      await wait(0);
      rendered.update();

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
          <NotificationsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();

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

      await wait(0);
      rendered.update();

      expect(
        rendered.find("Component").prop("player").details.contactSettings
          .subscribedToSMSNewsletters
      ).toBe(true);
    });
  });
});
