// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { fetchLatestPlayedSaga } from "Models/gameSearch/gameSearch.saga.latestPlayed";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useLatestPlayed } from "Models/gameSearch";

jest.mock("Models/gameSearch/gameSearch.saga.latestPlayed");

describe("useLatestPlayed", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("it should return an object with latestPlayedIds that is an array of ids stored in latestPlayedGames list", () => {
    const wrapper = mount(
      <MockStore>
        <HookWrapper hook={useLatestPlayed} args={[]} />
      </MockStore>
    );
    const expected = {
      latestPlayedIds: ["reel-heist", "fortune-charm"],
    };

    expectHook(wrapper).toEqual(expected);
  });

  test("it should call saga to fetch latest played games to fill the game list", () => {
    mount(
      <MockStore>
        <HookWrapper hook={useLatestPlayed} args={[]} />
      </MockStore>
    );

    expect(fetchLatestPlayedSaga).toHaveBeenCalledTimes(1);
  });
});
