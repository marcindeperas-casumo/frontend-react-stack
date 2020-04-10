// @flow
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { SettingsNotifications } from "./SettingsNotifications";
import { SettingsNotificationsContainer } from "./SettingsNotificationsContainer";
import {
  playerContactSettingsQueryMock,
  playerContactSettingsQueryErrorMock,
  notificationsLabelsQueryMock,
  notificationsLabelsQueryErrorMock,
} from "./__mocks__/Queries.mock";

jest.useFakeTimers();

describe("Notifications", () => {
  describe("Component", () => {
    test("should render loader", () => {
      const rendered = mount(
        <MockStore
          queryAddTypename
          queryMocks={[
            playerContactSettingsQueryMock,
            notificationsLabelsQueryMock,
          ]}
        >
          <SettingsNotificationsContainer />
        </MockStore>
      );

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    test("should pass correct player data to children", () => {
      const rendered = mount(
        <MockStore
          queryAddTypename
          queryMocks={[
            playerContactSettingsQueryMock,
            notificationsLabelsQueryMock,
          ]}
        >
          <SettingsNotificationsContainer />
        </MockStore>
      );

      act(() => {
        jest.runAllTimers();
        rendered.update();
      });

      expect(rendered.find(SettingsNotifications).prop("player")).toStrictEqual(
        playerContactSettingsQueryMock.result.data.player
      );
    });

    test("should pass correct labels to children", () => {
      const rendered = mount(
        <MockStore
          queryAddTypename
          queryMocks={[
            playerContactSettingsQueryMock,
            notificationsLabelsQueryMock,
          ]}
        >
          <SettingsNotificationsContainer />
        </MockStore>
      );

      act(() => {
        jest.runAllTimers();
        rendered.update();
      });

      expect(rendered.find(SettingsNotifications).prop("labels")).toStrictEqual(
        notificationsLabelsQueryMock.result.data
      );
    });

    test("should show error when settings fail to load", () => {
      const rendered = mount(
        <MockStore
          queryAddTypename
          queryMocks={[
            playerContactSettingsQueryErrorMock,
            notificationsLabelsQueryMock,
          ]}
        >
          <SettingsNotificationsContainer />
        </MockStore>
      );

      act(() => {
        jest.runAllTimers();
        rendered.update();
      });

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should show error when labels fail to load", () => {
      const rendered = mount(
        <MockStore
          queryAddTypename
          queryMocks={[
            playerContactSettingsQueryMock,
            notificationsLabelsQueryErrorMock,
          ]}
        >
          <SettingsNotificationsContainer />
        </MockStore>
      );

      act(() => {
        jest.runAllTimers();
        rendered.update();
      });

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });
  });
});
