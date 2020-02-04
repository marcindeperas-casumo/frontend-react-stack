import React from "react";
import { shallow } from "enzyme";
import LiveCasinoCard from "./LiveCasinoCard";

describe("LiveCasinoCard", () => {
  test("returns null if no lobby", () => {
    const game = {};
    const rendered = shallow(
      <LiveCasinoCard game={game} launchGame={() => {}} />
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("launchGame is called when clicking in card header", () => {
    const launchGame = jest.fn();
    const game = { liveCasinoLobby: { tableId: "table" } };
    const rendered = shallow(
      <LiveCasinoCard game={game} launchGame={launchGame} />
    );

    rendered
      .find("Card")
      .shallow()
      .find("div.o-ratio--live-casino-card")
      .simulate("click");

    expect(launchGame).toBeCalledTimes(1);
  });

  test("launchGame is called when clicking in card content", () => {
    const launchGame = jest.fn();
    const game = { liveCasinoLobby: { tableId: "table" } };
    const rendered = shallow(
      <LiveCasinoCard game={game} launchGame={launchGame} />
    );

    rendered
      .find("Card")
      .shallow()
      .find("FlexBlock")
      .first()
      .childAt(0)
      .simulate("click");

    expect(launchGame).toBeCalledTimes(1);
  });
});
