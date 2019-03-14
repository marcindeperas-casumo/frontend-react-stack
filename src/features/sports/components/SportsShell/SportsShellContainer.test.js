// @flow
import React from "react";
import { mount } from "enzyme";
import wait from "waait";
import {
  REACT_APP_EVENT_MENU_OPENED,
  REACT_APP_EVENT_MENU_CLOSED,
  REACT_APP_SPORTS_SHOW_SEARCH,
} from "Src/constants";
import bridge from "Src/DurandalReactBridge";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import {
  OPEN_MODAL_MUTATION,
  UPDATE_BETSLIP_STATE_MUTATION,
  SHOW_SEARCH,
  HIDE_SEARCH,
} from "Features/sports/state";
import { getQueryMocks } from "./__mocks__/sportsShellQuery";
import { SportsShellContainer } from "./SportsShellContainer";
import type { MockResult } from "./__mocks__/sportsShellQuery";

const initStateResult = {
  data: {
    hasSelectedFavourites: false,
    searchVisible: false,
  },
};

const getInstanceForMocks = (mockResult: MockResult) =>
  mount(
    <MockedProviderWithContext
      mocks={getQueryMocks(mockResult)}
      addTypename={false}
    >
      <SportsShellContainer />
    </MockedProviderWithContext>
  )
    .find(SportsShellContainer)
    .instance();

describe("<SportsShellContainer />", () => {
  describe("when the sports shell query errors", () => {
    // TODO: migrate to storybook, should render ErrorComponent instead
    test("it should render the skeleton", () => {
      expect(false).toBe(true);
    });
  });

  describe("when the sports shell query is loading", () => {
    // TODO: migrate to storybook
    test("it should render the skeleton", () => {
      expect(false).toBe(true);
    });
  });

  describe("when the query succeeds", () => {
    test("it should create a working listener on the bridge to show sports search", () => {
      const instance = getInstanceForMocks(initStateResult);
      const mutate = jest.spyOn(instance.context.client, "mutate");

      instance.componentDidMount();
      bridge.emit(REACT_APP_SPORTS_SHOW_SEARCH, true);

      expect(mutate).toHaveBeenCalledWith({
        mutation: SHOW_SEARCH,
      });
    });

    test("it should create a working listener on the bridge to hide sports search", () => {
      const instance = getInstanceForMocks(initStateResult);
      const mutate = jest.spyOn(instance.context.client, "mutate");

      instance.componentDidMount();
      bridge.emit(REACT_APP_SPORTS_SHOW_SEARCH, false);

      expect(mutate).toHaveBeenCalledWith({
        mutation: HIDE_SEARCH,
      });
    });

    test("it should create a working listener on the bridge to show the betslip", () => {
      const instance = getInstanceForMocks(initStateResult);
      const mutate = jest.spyOn(instance.context.client, "mutate");

      instance.componentDidMount();
      bridge.emit(REACT_APP_EVENT_MENU_CLOSED, false);

      expect(mutate).toHaveBeenCalledWith({
        mutation: UPDATE_BETSLIP_STATE_MUTATION,
        variables: { isVisible: true },
      });
    });

    test("it should create a working listener on the bridge to hide the betslip", () => {
      const instance = getInstanceForMocks(initStateResult);
      const mutate = jest.spyOn(instance.context.client, "mutate");

      instance.componentDidMount();
      bridge.emit(REACT_APP_EVENT_MENU_OPENED, false);

      expect(mutate).toHaveBeenCalledWith({
        mutation: UPDATE_BETSLIP_STATE_MUTATION,
        variables: { isVisible: false },
      });
    });

    describe("when a player has selected favourites", () => {
      test("it should not call the open modal mutation on mount", () => {
        const instance = getInstanceForMocks({
          ...initStateResult,
          hasSelectedFavourites: true,
        });
        const mutate = jest.spyOn(instance.context.client, "mutate");

        instance.componentDidMount();
        expect(mutate).not.toHaveBeenCalledWith({
          mutation: OPEN_MODAL_MUTATION,
          variables: { modal: "CHOOSE_FAVOURITES" },
        });
      });

      // TODO: migrate to storybook
      test("it should render a kambi client", () => {
        expect(false).toBe(true);
      });
    });

    describe("when a player has not selected favourites", () => {
      test("it should call the open modal mutation on mount", async () => {
        const instance = getInstanceForMocks(initStateResult);
        const mutate = jest.spyOn(instance.context.client, "mutate");

        instance.componentDidMount();

        // account for setTimeout workaround for apollo bug
        await wait(150);

        expect(mutate).toHaveBeenCalledWith({
          mutation: OPEN_MODAL_MUTATION,
          variables: { modal: "CHOOSE_FAVOURITES" },
        });
      });

      // TODO: migrate to storybook
      test("it should render null", () => {
        expect(false).toBe(true);
      });
    });

    describe("when search is visible", () => {
      // TODO: migrate to storybook
      test("it should render sports search", () => {
        expect(false).toBe(true);
      });
    });

    describe("when search is not visible", () => {
      // TODO: migrate to storybook
      test("it should render sports nav", () => {
        expect(false).toBe(true);
      });
    });
  });
});
