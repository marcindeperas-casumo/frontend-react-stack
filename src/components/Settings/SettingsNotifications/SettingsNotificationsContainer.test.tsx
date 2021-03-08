import React from "react";
import { mount } from "enzyme";
import { wait } from "Utils/apolloTestUtils";
import MockStore from "Components/MockStore";
import { SettingsNotifications } from "./SettingsNotifications";
import { SettingsNotificationsContainer } from "./SettingsNotificationsContainer";
import {
  playerContactSettingsQueryMock,
  playerContactSettingsQueryErrorMock,
} from "./__mocks__/Queries.mock";

jest.useFakeTimers();
jest.mock("Utils/hooks/useTranslationsGql", () => ({
  useTranslationsGql: () => ({
    t: {},
    loading: false,
  }),
}));

describe("Notifications", () => {
  describe("Component", () => {
    test("should render loader", () => {
      const rendered = mount(
        <MockStore
          queryAddTypename
          queryMocks={[playerContactSettingsQueryMock]}
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
          queryMocks={[playerContactSettingsQueryMock]}
        >
          <SettingsNotificationsContainer />
        </MockStore>
      );

      wait().then(() => {
        expect(
          rendered.find(SettingsNotifications).prop("player")
        ).toStrictEqual(playerContactSettingsQueryMock.result.data.player);
      });
    });

    test("should show error when settings fail to load", () => {
      const rendered = mount(
        <MockStore
          queryAddTypename
          queryMocks={[playerContactSettingsQueryErrorMock]}
        >
          <SettingsNotificationsContainer />
        </MockStore>
      );

      wait().then(() => {
        expect(rendered.find("ErrorMessage")).toHaveLength(1);
      });
    });
  });
});
