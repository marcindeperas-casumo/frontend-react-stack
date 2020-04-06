import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import MockStore from "Components/MockStore";
import { SettingsSections } from "./SettingsSections";
import { SettingsSectionsContainer } from "./SettingsSectionsContainer";
import {
  playerSectionsQueryMock,
  playerSectionsLabelsQueryMock,
  playerSectionsQueryErrorMock,
  playerSectionsLabelsQueryErrorMock,
} from "./__mocks__/Queries.mock";

jest.useFakeTimers();

describe("SettingsSections", () => {
  describe("Player Settings", () => {
    test("should render loader", () => {
      const rendered = mount(
        <MockStore
          queryMocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
        >
          <SettingsSectionsContainer />
        </MockStore>
      );

      act(() => jest.runAllTimers());

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    // TODO PCC-531 skip it because query properties error, loading, data are all undefined
    test.skip("should show error", () => {
      const rendered = mount(
        <MockStore
          queryMocks={[
            playerSectionsQueryErrorMock,
            playerSectionsLabelsQueryMock,
          ]}
        >
          <SettingsSectionsContainer />
        </MockStore>
      );

      act(() => {
        jest.advanceTimersByTime(10);
        rendered.update();
      });

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", () => {
      const rendered = mount(
        <MockStore
          queryAddTypename
          queryMocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
        >
          <SettingsSectionsContainer />
        </MockStore>
      );

      act(() => {
        jest.advanceTimersByTime(10);
        rendered.update();
      });

      expect(
        rendered.find(SettingsSections).prop("playerLoginHistory")
      ).toStrictEqual(playerSectionsQueryMock.result.data);
    });
  });

  describe("Labels", () => {
    test("should show error", () => {
      const rendered = mount(
        <MockStore
          queryMocks={[
            playerSectionsQueryMock,
            playerSectionsLabelsQueryErrorMock,
          ]}
        >
          <SettingsSectionsContainer />
        </MockStore>
      );

      act(() => {
        jest.advanceTimersByTime(10);
        rendered.update();
      });

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", () => {
      const rendered = mount(
        <MockStore
          queryMocks={[playerSectionsQueryMock, playerSectionsLabelsQueryMock]}
        >
          <SettingsSectionsContainer />
        </MockStore>
      );

      act(() => {
        jest.advanceTimersByTime(10);
        rendered.update();
      });

      expect(
        JSON.parse(
          JSON.stringify(rendered.find(SettingsSections).prop("labels"))
        )
      ).toStrictEqual(playerSectionsLabelsQueryMock.result.data);
    });
  });
});
