import React from "react";
import { shallow } from "enzyme";
import Jackpots from "Components/Jackpots/Jackpots";

describe("<Jackpots />", () => {
  let subscribeToUpdates;
  let unsubscribeFromUpdates;
  let rendered;
  let ids;

  beforeEach(() => {
    subscribeToUpdates = jest.fn();
    unsubscribeFromUpdates = jest.fn();
    ids = ["1", "2", "3", "4", "5", "6", "7"];
    rendered = shallow(
      <Jackpots
        ids={ids}
        subscribeToUpdates={subscribeToUpdates}
        unsubscribeFromUpdates={unsubscribeFromUpdates}
      />
    );
  });

  test("renders a <ScrollableListTitle /> component", () => {
    expect(rendered.find("ScrollableListTitle").length).toBe(1);
  });

  test("renders tiles for every 3 game", () => {
    expect(rendered.find("JackpotsListTile").length).toBe(3);
  });

  test("passes down jackpot-ids to the tiles", () => {
    const firstTile = rendered.find("JackpotsListTile").first();

    expect(firstTile.props().ids).toEqual(["1", "2", "3"]);
  });

  test("subscribes to updates when mounted", () => {
    expect(subscribeToUpdates).toBeCalledTimes(1);
  });

  test("unsubscribes when unmounted", () => {
    expect(unsubscribeFromUpdates).toBeCalledTimes(0);
    rendered.unmount();
    expect(unsubscribeFromUpdates).toBeCalledTimes(1);
  });
});
