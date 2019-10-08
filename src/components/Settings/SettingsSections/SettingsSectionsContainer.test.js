import React from "react";
import wait from "waait";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { withContainer } from "./SettingsSectionsContainer";
import {
  playerSectionsQueryMock,
  playerSectionsLabelsQueryMock,
  playerSectionsQueryErrorMock,
  playerSectionsLabelsQueryErrorMock,
} from "./__mocks__/Queries.mock";

let Component, SettingsSectionsContainer;
describe("SettingsSections", () => {
  beforeEach(() => {
    Component = props => <div />;
    SettingsSectionsContainer = () => withContainer(Component);
  });

  describe("Player Settings", () => {
    test("should render loader", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
        >
          <SettingsSectionsContainer />
        </MockedProvider>
      );

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    test("should show error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsLabelsQueryMock, playerSectionsQueryErrorMock]}
        >
          <SettingsSectionsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
        >
          <SettingsSectionsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(
        JSON.parse(
          JSON.stringify(rendered.find("Component").prop("playerLoginHistory"))
        )
      ).toStrictEqual(playerSectionsQueryMock.result.data);
    });
  });

  describe("Labels", () => {
    test("should show error", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsLabelsQueryErrorMock, playerSectionsQueryMock]}
        >
          <SettingsSectionsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", async () => {
      const rendered = mount(
        <MockedProvider
          mocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
        >
          <SettingsSectionsContainer />
        </MockedProvider>
      );
      await wait(0);
      rendered.update();
      expect(
        JSON.parse(JSON.stringify(rendered.find("Component").prop("labels")))
      ).toStrictEqual(playerSectionsLabelsQueryMock.result.data);
    });
  });
});
