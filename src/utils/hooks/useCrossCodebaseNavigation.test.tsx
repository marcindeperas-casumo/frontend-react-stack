import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { HookWrapper } from "Utils/HookWrapper";
import { useCrossCodebaseNavigation } from "./useCrossCodebaseNavigation";

jest.mock("../../constants", () => ({
  ...(jest.requireActual("../../constants") as object),
  URL_PREFIXES: {
    myMarket: "myMarketUrlPrefix",
  },
  MARKETS: {
    myMarket: "myMarket",
  },
  ROUTE_IDS: {
    myRouteId: "myRouteId",
    myRouteIdWithParams: "myRouteIdWithParams",
  },
  ROUTES: {
    myRouteId: "myRoutePath",
    myRouteIdWithParams: "myRouteIdWithParams/:param1/:param2",
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
const locationBackup = window.location;

describe("useCrossCodebaseNavigation", () => {
  let wrapper;

  beforeEach(() => {
    // eslint-disable-next-line fp/no-delete
    delete window.location;
    window.location = {
      ...locationBackup,
      hostname: "casumo.com",
      replace: jest.fn(),
    };
    wrapper = mount(
      <MockStore state={state}>
        <HookWrapper hook={useCrossCodebaseNavigation} args={[]} />
      </MockStore>
    );
  });
  afterEach(() => {
    window.location = locationBackup;
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

  test("calls window.location.replace with path with substituted url params", () => {
    const { navigateToKO } = wrapper.find("div").props().hook;
    const param1 = "substitutedParam1";
    const param2 = "substitutedParam2";

    navigateToKO("myRouteIdWithParams", { param1, param2 });

    expect(window.location.replace).toHaveBeenCalledTimes(1);
    expect(window.location.replace).toHaveBeenCalledWith(
      `/myMarketUrlPrefix/myRouteIdWithParams/${param1}/${param2}`
    );
  });
});
