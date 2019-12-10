import React from "react";
import { shallow } from "enzyme";
import {
  CurrencyCadIcon,
  CurrencyEurIcon,
  CurrencyGbpIcon,
  CurrencyKrnIcon,
  CurrencyRupIcon,
} from "@casumo/cmp-icons";
import { VALUABLE_TYPES } from "Models/valuables";
import { CURRENCIES } from "Src/constants";
import { ValuableSymbol } from "./ValuableSymbol";

describe("ValuableSymbol", () => {
  let rendered;
  const cashValuableType = VALUABLE_TYPES.CASH;

  test("should render eur icon by default", () => {
    rendered = shallow(
      <ValuableSymbol currency={"foo"} valuableType={cashValuableType} />
    );

    expect(rendered.find(CurrencyEurIcon).exists()).toBe(true);
  });

  test("should render eur icon if currency is EUR", () => {
    rendered = shallow(
      <ValuableSymbol
        currency={CURRENCIES.EUR}
        valuableType={cashValuableType}
      />
    );

    expect(rendered.find(CurrencyEurIcon).exists()).toBe(true);
  });

  test("should render cad icon if currency is CAD", () => {
    rendered = shallow(
      <ValuableSymbol
        valuableType={cashValuableType}
        currency={CURRENCIES.CAD}
      />
    );

    expect(rendered.find(CurrencyCadIcon).exists()).toBe(true);
  });

  test("should render cad icon if currency is GBP", () => {
    rendered = shallow(
      <ValuableSymbol
        valuableType={cashValuableType}
        currency={CURRENCIES.GBP}
      />
    );

    expect(rendered.find(CurrencyGbpIcon).exists()).toBe(true);
  });

  test("should render krn icon if currency is SEK", () => {
    rendered = shallow(
      <ValuableSymbol
        valuableType={cashValuableType}
        currency={CURRENCIES.SEK}
      />
    );

    expect(rendered.find(CurrencyKrnIcon).exists()).toBe(true);
  });

  test("should render krn icon if currency is DKK", () => {
    rendered = shallow(
      <ValuableSymbol
        valuableType={cashValuableType}
        currency={CURRENCIES.DKK}
      />
    );

    expect(rendered.find(CurrencyKrnIcon).exists()).toBe(true);
  });

  test("should render cad icon if currency is RUP", () => {
    rendered = shallow(
      <ValuableSymbol
        valuableType={cashValuableType}
        currency={CURRENCIES.INR}
      />
    );

    expect(rendered.find(CurrencyRupIcon).exists()).toBe(true);
  });

  test("should render cad icon if currency is USD", () => {
    rendered = shallow(
      <ValuableSymbol
        valuableType={cashValuableType}
        currency={CURRENCIES.USD}
      />
    );

    expect(rendered.find(CurrencyCadIcon).exists()).toBe(true);
  });
});
