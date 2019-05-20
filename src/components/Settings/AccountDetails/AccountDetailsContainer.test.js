import React from "react";
import wait from "waait";
import { mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import { withContainer } from "./AccountDetailsContainer";
import {
  playerSettingsQueryMock,
  playerSettingsLabelsQueryMock,
  playerSettingsQueryErrorMock,
  playerSettingsLabelsQueryErrorMock,
} from "./__mocks__/Queries.mock";

let Component, AccountDetailsContainer;
describe("AccountDetails", () => {
  describe("Player Settings", () => {
    beforeEach(() => {
      Component = props => <div />;
      AccountDetailsContainer = () => withContainer(Component);
    });

    test("should render loader", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsQueryMock, playerSettingsLabelsQueryMock]}
        >
          <AccountDetailsContainer />
        </MockedProvider>
      );

      expect(rendered.find("RowListSkeleton")).toHaveLength(1);
    });

    test("should show error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsLabelsQueryMock, playerSettingsQueryErrorMock]}
        >
          <AccountDetailsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsQueryMock, playerSettingsLabelsQueryMock]}
        >
          <AccountDetailsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(rendered.find("Component").prop("player")).toStrictEqual(
        playerSettingsQueryMock.result.data.player
      );
    });
  });

  describe("Labels", () => {
    beforeEach(() => {
      Component = props => <div />;
      AccountDetailsContainer = () => withContainer(Component);
    });

    test("should show error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsLabelsQueryErrorMock, playerSettingsQueryMock]}
        >
          <AccountDetailsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSettingsQueryMock, playerSettingsLabelsQueryMock]}
        >
          <AccountDetailsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(
        JSON.parse(JSON.stringify(rendered.find("Component").prop("labels"))) //for some reason, this prop's object prototype is null
      ).toStrictEqual(playerSettingsLabelsQueryMock.result.data);
    });
  });
});
