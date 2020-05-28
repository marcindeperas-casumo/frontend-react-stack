import React from "react";
import { shallow } from "enzyme";
import { launchGame } from "Services/LaunchGameService";
import { LiveCasinoCard } from "./LiveCasinoCard";

const t = {
  playNowText: "play now",
  betBehindText: "bet behind",
  openSeatsText: "open seats",
};

jest.mock("Services/LaunchGameService", () => ({
  launchGame: jest.fn(),
}));

describe("LiveCasinoCard", () => {
  test("returns null if no lobby", () => {
    const game = {};
    const rendered = shallow(<LiveCasinoCard game={game} t={t} />);

    expect(rendered.isEmptyRender()).toBe(true);
  });

  test("launchGame is called when clicking in card header", () => {
    launchGame.mockClear();
    const game = { liveCasinoLobby: { tableId: "table" } };
    const rendered = shallow(<LiveCasinoCard game={game} t={t} />);

    rendered
      .find("Card")
      .shallow()
      .find("div.o-ratio--live-casino-card")
      .simulate("click");

    expect(launchGame).toBeCalledTimes(1);
  });

  test("launchGame is called when clicking in card content", () => {
    launchGame.mockClear();
    const game = { liveCasinoLobby: { tableId: "table" } };
    const rendered = shallow(<LiveCasinoCard game={game} t={t} />);

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
