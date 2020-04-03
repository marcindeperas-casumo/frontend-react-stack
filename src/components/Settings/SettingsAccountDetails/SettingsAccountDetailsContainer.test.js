import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { MockedProvider } from "@apollo/react-testing";
import { SettingsAccountDetails } from "./SettingsAccountDetails";
import { SettingsAccountDetailsContainer } from "./SettingsAccountDetailsContainer";
import {
  playerSettingsQueryMock,
  playerSettingsLabelsQueryMock,
  playerSettingsQueryErrorMock,
  playerSettingsLabelsQueryErrorMock,
} from "./__mocks__/Queries.mock";

jest.useFakeTimers();

describe("AccountDetails", () => {
  describe("Player Settings", () => {
    test("should render loader", () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsQueryMock, playerSettingsLabelsQueryMock]}
        >
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      act(jest.runAllTimers);

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    test("should show error", () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsLabelsQueryMock, playerSettingsQueryErrorMock]}
        >
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
        <MockedProvider
          mocks={[playerSettingsQueryMock, playerSettingsLabelsQueryMock]}
        >
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      act(() => {
        jest.advanceTimersByTime(10);
        rendered.update();
      });

      expect(
        rendered.find(SettingsAccountDetails).prop("player")
      ).toStrictEqual(playerSettingsQueryMock.result.data.player);
    });
  });

  describe("Labels", () => {
    test("should show error", () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsLabelsQueryErrorMock, playerSettingsQueryMock]}
        >
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
        <MockedProvider
          mocks={[playerSettingsQueryMock, playerSettingsLabelsQueryMock]}
        >
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      act(() => {
        jest.advanceTimersByTime(10);
        rendered.update();
      });

      expect(
        JSON.parse(
          JSON.stringify(rendered.find(SettingsAccountDetails).prop("labels"))
        ) //for some reason, this prop's object prototype is null
      ).toStrictEqual(playerSettingsLabelsQueryMock.result.data);
    });
  });
});
