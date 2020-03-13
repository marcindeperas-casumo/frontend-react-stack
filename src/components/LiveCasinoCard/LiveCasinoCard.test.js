import React from "react";
import { shallow } from "enzyme";
import LiveCasinoCard from "./LiveCasinoCard";

describe("LiveCasinoCard", () => {
  test("returns null if no lobby", () => {
    const game = {};
    const rendered = shallow(
      <LiveCasinoCard game={game} onLaunchGame={() => {}} />
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("onLaunchGame is called when clicking in card header", () => {
    const onLaunchGame = jest.fn();
    const game = { liveCasinoLobby: { tableId: "table" } };
    const rendered = shallow(
      <LiveCasinoCard game={game} onLaunchGame={onLaunchGame} />
    );

    rendered
      .find("Card")
      .shallow()
      .find("div.o-ratio--live-casino-card")
      .simulate("click");

    expect(onLaunchGame).toBeCalledTimes(1);
  });

  test("onLaunchGame is called when clicking in card content", () => {
    const onLaunchGame = jest.fn();
    const game = { liveCasinoLobby: { tableId: "table" } };
    const rendered = shallow(
      <LiveCasinoCard game={game} onLaunchGame={onLaunchGame} />
    );

    rendered
      .find("Card")
      .shallow()
      .find("FlexBlock")
      .first()
      .childAt(0)
      .simulate("click");

    expect(onLaunchGame).toBeCalledTimes(1);
  });
});
