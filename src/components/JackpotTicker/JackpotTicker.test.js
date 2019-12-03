import React from "react";
import { shallow } from "enzyme";
import Badge from "@casumo/cmp-badge";
import JackpotTicker from "Components/JackpotTicker";
import { jackpotTickerClass } from "Components/GameTile/GameTileJackpot";
import { CURRENCIES } from "Src/constants";

describe("JackpotTicker", () => {
  const locale = "en";
  let jackpotValue, formattedJackpotAmount;

  test("should render the Badge component if formattedJackpotAmount exists", () => {
    formattedJackpotAmount = "€12,347";
    jackpotValue = {
      currency: CURRENCIES.EUR,
      amount: 12347,
    };
    const rendered = shallow(
      <JackpotTicker locale={locale} value={jackpotValue} />
    );

    expect(
      rendered.containsMatchingElement(<Badge>{formattedJackpotAmount}</Badge>)
    ).toEqual(true);
  });

  test("should NOT render the Badge component if formattedJackpotAmount is null", () => {
    formattedJackpotAmount = null;
    jackpotValue = null;
    const rendered = shallow(
      <JackpotTicker locale={locale} value={jackpotValue} />
    );

    expect(
      rendered.containsMatchingElement(<Badge>{formattedJackpotAmount}</Badge>)
    ).toEqual(false);
  });

  test("should apply jackpotTickerClass to the Badge", () => {
    jackpotValue = {
      currency: CURRENCIES.EUR,
      amount: 12347,
    };
    const rendered = shallow(
      <JackpotTicker
        locale={locale}
        value={jackpotValue}
        className={jackpotTickerClass}
      />
    );

    expect(rendered.hasClass(jackpotTickerClass)).toEqual(true);
  });
});
