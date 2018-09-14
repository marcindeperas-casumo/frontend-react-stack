import React from "react";
import { shallow } from "enzyme";
import JackpotTicker from "./JackpotTicker";
import { jackpotTickerClass } from "../GameTile/GameTileJackpot";
import Badge from "@casumo/cmp-badge";

describe("JackpotTicker", () => {
  let formattedJackpotAmount;

  test("should render the Badge component if formattedJackpotAmount exists", () => {
    formattedJackpotAmount = "12347 €";
    const rendered = shallow(
      <JackpotTicker formattedJackpotAmount={formattedJackpotAmount} />
    );

    expect(
      rendered.containsMatchingElement(<Badge>{formattedJackpotAmount}</Badge>)
    ).toEqual(true);
  });

  test("should NOT render the Badge component if formattedJackpotAmount is null", () => {
    formattedJackpotAmount = null;
    const rendered = shallow(
      <JackpotTicker formattedJackpotAmount={formattedJackpotAmount} />
    );

    expect(
      rendered.containsMatchingElement(<Badge>{formattedJackpotAmount}</Badge>)
    ).toEqual(false);
  });

  test("should apply jackpotTickerClass to the Badge", () => {
    formattedJackpotAmount = "12347 €";
    const rendered = shallow(
      <JackpotTicker
        formattedJackpotAmount={formattedJackpotAmount}
        className={jackpotTickerClass}
      />
    );

    expect(rendered.hasClass(jackpotTickerClass)).toEqual(true);
  });
});
