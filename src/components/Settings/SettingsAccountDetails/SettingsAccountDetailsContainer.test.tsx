import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { mount } from "enzyme";
import { wait } from "Utils/apolloTestUtils";
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

      wait().then(() => {
        expect(rendered.find("SettingsRowListSkeleton")).toHaveLength(1);
      });
    });

    test("should show error", () => {
      const rendered = mount(
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ result: { errors: { foo: string; }[]; }; r... Remove this comment to see the full error message
        <MockedProvider mocks={[playerSettingsQueryErrorMock]}>
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      wait().then(() => {
        expect(rendered.find("ErrorMessage")).toHaveLength(1);
      });
    });

    test("should pass correct player to child", () => {
      const rendered = mount(
        <MockedProvider mocks={[playerSettingsQueryMock]}>
          <SettingsAccountDetailsContainer />
        </MockedProvider>
      );

      wait().then(() => {
        expect(
          rendered.find(SettingsAccountDetails).prop("player")
        ).toStrictEqual(playerSettingsQueryMock.result.data.player);
      });
    });
  });
});
