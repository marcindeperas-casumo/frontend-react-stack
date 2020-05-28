// @flow
import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import MockStore from "Components/MockStore";
import { SettingsSections } from "./SettingsSections";
import { SettingsSectionsContainer } from "./SettingsSectionsContainer";
import {
  playerSectionsQueryMock,
  playerSectionsQueryErrorMock,
} from "./__mocks__/Queries.mock";

jest.useFakeTimers();
jest.mock("Utils/hooks/useTranslationsGql", () => ({
  useTranslationsGql: () => ({
    t: {},
    loading: false,
  }),
}));

describe("SettingsSections", () => {
  describe("Player Settings", () => {
    test("should render loader", () => {
      const rendered = mount(
        <MockStore queryMocks={[playerSectionsQueryMock]}>
          <SettingsSectionsContainer />
        </MockStore>
      );

      act(() => jest.runAllTimers());

      expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
    });

    test("should show error", () => {
      const rendered = mount(
        <MockStore queryMocks={[playerSectionsQueryErrorMock]}>
          <SettingsSectionsContainer />
        </MockStore>
      );

      act(() => {
        jest.runAllTimers();
        rendered.update();
      });

      expect(rendered.find("ErrorMessage")).toHaveLength(1);
    });

    test("should pass correct player to child", () => {
      const rendered = mount(
        <MockStore queryAddTypename queryMocks={[playerSectionsQueryMock]}>
          <SettingsSectionsContainer />
        </MockStore>
      );

      act(() => {
        jest.runAllTimers();
        rendered.update();
      });

      expect(
        rendered.find(SettingsSections).prop("playerLoginHistory")
      ).toStrictEqual(playerSectionsQueryMock.result.data);
    });
  });
});
