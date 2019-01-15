import React from "react";
import { shallow } from "enzyme";
import LiveCasinoCard from "Components/LiveCasinoCard/LiveCasinoCard";

describe("LiveCasinoCard", () => {
  const launchGame = jest.fn();
  const subscribeToUpdates = jest.fn();
  const unsubscribeFromUpdates = jest.fn();

  test("subscribes to updates when mounted", () => {
    const game = { lobby: { tableId: "table" } };
    shallow(
      <LiveCasinoCard
        game={game}
        launchGame={launchGame}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    );

    expect(subscribeToUpdates).toBeCalledTimes(1);
  });

  test("unsubscribes when unmounted", () => {
    const game = { lobby: { tableId: "table" } };
    const rendered = shallow(
      <LiveCasinoCard
        game={game}
        launchGame={launchGame}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    );

    expect(unsubscribeFromUpdates).toBeCalledTimes(0);
    rendered.unmount();
    expect(unsubscribeFromUpdates).toBeCalledTimes(1);
  });

  test("returns null if no lobby", () => {
    const game = {};
    const rendered = shallow(
      <LiveCasinoCard
        game={game}
        launchGame={launchGame}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    );

    expect(rendered.getElement()).toBe(null);
  });
});
