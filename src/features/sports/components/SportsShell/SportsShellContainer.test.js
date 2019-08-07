// @flow
import React from "react";
import { mount } from "enzyme";
import {
  REACT_APP_EVENT_MENU_OPENED,
  REACT_APP_EVENT_MENU_CLOSED,
  REACT_APP_SPORTS_SHOW_SEARCH,
} from "Src/constants";
import bridge from "Src/DurandalReactBridge";
import { MockedProviderWithContext } from "Features/sports/components/GraphQL";
import {
  UPDATE_BETSLIP_STATE_MUTATION,
  SHOW_SEARCH,
  HIDE_SEARCH,
} from "Models/apollo/mutations";
import KambiClient from "Features/sports/components/KambiClient";
import SportsSearch from "Features/sports/components/SportsSearch";
import { SportsNav } from "Features/sports/components/SportsNav";
import Modals from "Features/sports/components/Modals";
import { SportsShellContainer } from "./SportsShellContainer";
import SportsShellSkeleton from "./SportsShellSkeleton";
import { getQueryMocks } from "./__mocks__/sportsShellQuery";
import type { MockResult } from "./__mocks__/sportsShellQuery";

const initStateResult = {
  data: {
    hasSelectedFavourites: false,
    isSearchVisible: false,
  },
};

const renderForMocks = (mockResult: MockResult) =>
  mount(
    <MockedProviderWithContext
      mocks={getQueryMocks(mockResult)}
      addTypename={false}
    >
      <SportsShellContainer />
    </MockedProviderWithContext>
  );

const getInstanceForMocks = (mockResult: MockResult) =>
  renderForMocks(mockResult)
    .find(SportsShellContainer)
    .instance();

const findComponents = rendered => ({
  skeleton: rendered.find(SportsShellSkeleton),
  search: rendered.find(SportsSearch),
  nav: rendered.find(SportsNav),
  modals: rendered.find(Modals),
  kambiClient: rendered.find(KambiClient),
});

describe("<SportsShellContainer />", () => {
  describe("when the sports shell query errors", () => {
    test("it should render the skeleton, and not the rest of the UI", () => {
      const ui = findComponents(renderForMocks({ error: true }));

      expect(ui.skeleton.length).toBe(1);
      expect(ui.search.length).toBe(0);
      expect(ui.nav.length).toBe(0);
      expect(ui.modals.length).toBe(0);
      expect(ui.kambiClient.length).toBe(0);
    });
  });

  describe("when the sports shell query is loading", () => {
    test("it should render the skeleton, and not the rest of the UI", () => {
      const ui = findComponents(renderForMocks({ loading: true }));

      expect(ui.skeleton.length).toBe(1);
      expect(ui.search.length).toBe(0);
      expect(ui.nav.length).toBe(0);
      expect(ui.modals.length).toBe(0);
      expect(ui.kambiClient.length).toBe(0);
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
  });
});
