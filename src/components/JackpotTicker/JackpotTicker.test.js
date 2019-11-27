import React from "react";
import { shallow } from "enzyme";
import Badge from "@casumo/cmp-badge";
import JackpotTicker from "Components/JackpotTicker";
import { jackpotTickerClass } from "Components/GameTile/GameTileJackpot";

describe("JackpotTicker", () => {
  let jackotValue, formattedJackpotAmount;

  test("should render the Badge component if formattedJackpotAmount exists", () => {
    formattedJackpotAmount = "€12,347.00";
    jackotValue = {
      currency: "EUR",
      amount: 12347,
    };
    const rendered = shallow(<JackpotTicker value={jackotValue} />);

    expect(
      rendered.containsMatchingElement(<Badge>{formattedJackpotAmount}</Badge>)
    ).toEqual(true);
  });

  test("should NOT render the Badge component if formattedJackpotAmount is null", () => {
    formattedJackpotAmount = null;
    jackotValue = null;
    const rendered = shallow(<JackpotTicker value={jackotValue} />);

    expect(
      rendered.containsMatchingElement(<Badge>{formattedJackpotAmount}</Badge>)
    ).toEqual(false);
  });

  test("should apply jackpotTickerClass to the Badge", () => {
    jackotValue = {
      currency: "EUR",
      amount: 12347,
    };
    const rendered = shallow(
      <JackpotTicker value={jackotValue} className={jackpotTickerClass} />
    );

    expect(rendered.hasClass(jackpotTickerClass)).toEqual(true);
  });
});
