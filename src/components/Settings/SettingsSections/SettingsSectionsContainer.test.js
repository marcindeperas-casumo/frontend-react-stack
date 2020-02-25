import React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
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
    test("should render loader", () => {
      const rendered = mount(
        <MockStore
          queryMocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
          addGqlTypename
        >
          <SettingsSectionsContainer />
        </MockStore>
      );

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    test("should show error", async () => {
      const rendered = mount(
        <MockStore
          queryMocks={[
            playerSectionsLabelsQueryMock,
            playerSectionsQueryErrorMock,
          ]}
          addGqlTypename
        >
          <SettingsSectionsContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered);

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", async () => {
      const rendered = mount(
        <MockStore
          queryMocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
          addGqlTypename
        >
          <SettingsSectionsContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered);

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
        <MockStore
          queryMocks={[
            playerSectionsLabelsQueryErrorMock,
            playerSectionsQueryMock,
          ]}
          addGqlTypename
        >
          <SettingsSectionsContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered);

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", async () => {
      const rendered = mount(
        <MockStore
          queryMocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
          addGqlTypename
        >
          <SettingsSectionsContainer />
        </MockStore>
      );

      await waitAndUpdateWrapper(rendered);

      expect(
        JSON.parse(JSON.stringify(rendered.find("Component").prop("labels")))
      ).toStrictEqual(playerSectionsLabelsQueryMock.result.data);
    });
  });
});
