import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { updateWrapper } from "Utils";
import { withContainer } from "./SettingsAccountDetailsContainer";
import {
  playerSettingsQueryMock,
  playerSettingsLabelsQueryMock,
  playerSettingsQueryErrorMock,
  playerSettingsLabelsQueryErrorMock,
} from "./__mocks__/Queries.mock";

let Component, SettingsAccountDetailsContainer;
describe("AccountDetails", () => {
  beforeEach(() => {
    Component = props => <div />;
    SettingsAccountDetailsContainer = () => withContainer(Component);
  });

  describe("Player Settings", () => {
    test("should render loader", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsQueryMock, playerSettingsLabelsQueryMock]}
        >
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    test("should show error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsLabelsQueryMock, playerSettingsQueryErrorMock]}
        >
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      await updateWrapper(rendered);

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsQueryMock, playerSettingsLabelsQueryMock]}
        >
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      await updateWrapper(rendered);

      expect(rendered.find("Component").prop("player")).toStrictEqual(
        playerSettingsQueryMock.result.data.player
      );
    });
  });

  describe("Labels", () => {
    test("should show error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsLabelsQueryErrorMock, playerSettingsQueryMock]}
        >
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      await updateWrapper(rendered);

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsQueryMock, playerSettingsLabelsQueryMock]}
        >
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      await updateWrapper(rendered);

      expect(
        JSON.parse(JSON.stringify(rendered.find("Component").prop("labels"))) //for some reason, this prop's object prototype is null
      ).toStrictEqual(playerSettingsLabelsQueryMock.result.data);
    });
  });
});
