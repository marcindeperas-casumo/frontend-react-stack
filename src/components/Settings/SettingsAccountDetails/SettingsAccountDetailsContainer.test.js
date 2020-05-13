// @flow
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/react-testing";
import { SettingsAccountDetails } from "./SettingsAccountDetails";
import { SettingsAccountDetailsContainer } from "./SettingsAccountDetailsContainer";
import {
  playerSettingsQueryMock,
  playerSettingsQueryErrorMock,
} from "./__mocks__/Queries.mock";

jest.useFakeTimers();
jest.mock("Utils/hooks/useTranslationsGql", () => ({
  useTranslationsGql: () => ({
    t: {},
    loading: false,
  }),
}));

describe("AccountDetails", () => {
  describe("Player Settings", () => {
    test("should render loader", () => {
      const rendered = mount(
        <MockedProvider mocks={[playerSettingsQueryMock]}>
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      act(() => jest.runAllTimers());

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    test("should show error", () => {
      const rendered = mount(
        <MockedProvider mocks={[playerSettingsQueryErrorMock]}>
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      act(() => {
        jest.advanceTimersByTime(10);
        rendered.update();
      });

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", () => {
      const rendered = mount(
        <MockedProvider mocks={[playerSettingsQueryMock]}>
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      act(() => {
        jest.runAllTimers();
        rendered.update();
      });

      expect(
        rendered.find(SettingsAccountDetails).prop("player")
      ).toStrictEqual(playerSettingsQueryMock.result.data.player);
    });
  });
});
