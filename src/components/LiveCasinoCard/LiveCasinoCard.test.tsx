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
  test("launchGame is called when clicking in card header", () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockClear' does not exist on type '({ sl... Remove this comment to see the full error message
    launchGame.mockClear();
    const game = { liveCasinoLobby: { tableId: "table" } };
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    const rendered = shallow(<LiveCasinoCard game={game} t={t} />);

    rendered
      .find("Card")
      .shallow()
      .find("div.o-ratio--live-casino-card")
      .simulate("click");

    expect(launchGame).toBeCalledTimes(1);
  });

  test("launchGame is called when clicking in card content", () => {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mockClear' does not exist on type '({ sl... Remove this comment to see the full error message
    launchGame.mockClear();
    const game = { liveCasinoLobby: { tableId: "table" } };
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
