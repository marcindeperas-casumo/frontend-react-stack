import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "@apollo/react-testing";
import { waitAndUpdateWrapper } from "Utils";
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

      await waitAndUpdateWrapper(rendered);
    });

    test("should show error", async () => {
      const rendered = mount(
        <MockedProvider mocks={[playerSectionsQueryErrorMock]}>
          <SettingsSectionsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

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

      await waitAndUpdateWrapper(rendered, 100);

      expect(
        rendered.find("Component").prop("playerLoginHistory")
      ).toStrictEqual(playerSectionsQueryMock.result.data);
    });
  });

  describe("Labels", () => {
    test("should show error", async () => {
      const rendered = mount(
        <MockedProvider mocks={[playerSectionsLabelsQueryErrorMock]}>
          <SettingsSectionsContainer />
        </MockedProvider>
      );

      await waitAndUpdateWrapper(rendered);

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

      await waitAndUpdateWrapper(rendered);

      expect(
        JSON.parse(JSON.stringify(rendered.find("Component").prop("labels")))
      ).toStrictEqual(playerSectionsLabelsQueryMock.result.data);
    });
  });
});
