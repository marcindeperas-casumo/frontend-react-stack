// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper } from "Utils/HookWrapper";
import { useCrossCodebaseNavigation } from "./useCrossCodebaseNavigation";

jest.mock("../../constants.js", () => ({
  ...jest.requireActual("../../constants.js"),
  URL_PREFIXES: {
    myMarket: "myMarketUrlPrefix",
  },
  MARKETS: {
    myMarket: "myMarket",
  },
  ROUTE_IDS: {
    myRouteId: "myRouteId",
  },
  ROUTES: {
    myRouteId: "myRoutePath",
  },
}));

const state = {
  handshake: {
    app: {
      "common/composition/session": { id: "p1" },
      "common/composition/players": {
        players: {
          p1: {
            id: "p1",
            market: "myMarket",
          },
        },
      },
    },
  },
};

describe("useCrossCodebaseNavigation", () => {
  const { location } = window;
  const wrapper = mount(
    <MockStore state={state}>
      <HookWrapper hook={useCrossCodebaseNavigation} args={[]} />
    </MockStore>
  );

  beforeEach(() => {
    jest.resetAllMocks();

    // eslint-disable-next-line fp/no-delete
    delete window.location;

    window.location = {
      replace: jest.fn(),
    };
  });

  afterEach(() => {
    window.location = location;
  });
  test("returns navigateToKO function", () => {
    const { navigateToKO } = wrapper.find("div").props().hook;
    expect(typeof navigateToKO).toEqual("function");
  });
  test("calls window.location.replace with path", () => {
    const { navigateToKO } = wrapper.find("div").props().hook;

    navigateToKO("myRouteId");

    expect(window.location.replace).toHaveBeenCalledTimes(1);
    expect(window.location.replace).toHaveBeenCalledWith(
      "/myMarketUrlPrefix/myRoutePath"
    );
  });
});
