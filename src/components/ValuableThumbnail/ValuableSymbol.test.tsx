import React from "react";
import { shallow } from "enzyme";
import {
  WalletTabDollarUnselectedIcon,
  WalletTabEuroUnselectedIcon,
  WalletTabSterlingUnselectedIcon,
  WalletTabKroneUnselectedIcon,
  WalletTabRupeeUnselectedIcon,
} from "@casumo/cmp-icons";
import { VALUABLE_TYPES } from "Models/valuables";
import { CURRENCIES } from "Src/constants";
import { ValuableSymbol } from "./ValuableSymbol";

describe("ValuableSymbol", () => {
  let rendered;
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'CASH' does not exist on type '{}'.
  const cashValuableType = VALUABLE_TYPES.CASH;

  test("should render eur icon by default", () => {
    rendered = shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ currency: string; valuableType: any; }' is... Remove this comment to see the full error message
      <ValuableSymbol currency={"foo"} valuableType={cashValuableType} />
    );

    expect(rendered.find(WalletTabEuroUnselectedIcon).exists()).toBe(true);
  });

  test("should render eur icon if currency is EUR", () => {
    rendered = shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ currency: string; valuableType: any; }' is... Remove this comment to see the full error message
      <ValuableSymbol
        currency={CURRENCIES.EUR}
        valuableType={cashValuableType}
      />
    );

    expect(rendered.find(WalletTabEuroUnselectedIcon).exists()).toBe(true);
  });

  test("should render cad icon if currency is CAD", () => {
    rendered = shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ valuableType: any; currency: string; }' is... Remove this comment to see the full error message
      <ValuableSymbol
        valuableType={cashValuableType}
        currency={CURRENCIES.CAD}
      />
    );

    expect(rendered.find(WalletTabDollarUnselectedIcon).exists()).toBe(true);
  });

  test("should render cad icon if currency is GBP", () => {
    rendered = shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ valuableType: any; currency: string; }' is... Remove this comment to see the full error message
      <ValuableSymbol
        valuableType={cashValuableType}
        currency={CURRENCIES.GBP}
      />
    );

    expect(rendered.find(WalletTabSterlingUnselectedIcon).exists()).toBe(true);
  });

  test("should render krn icon if currency is SEK", () => {
    rendered = shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ valuableType: any; currency: string; }' is... Remove this comment to see the full error message
      <ValuableSymbol
        valuableType={cashValuableType}
        currency={CURRENCIES.SEK}
      />
    );

    expect(rendered.find(WalletTabKroneUnselectedIcon).exists()).toBe(true);
  });

  test("should render krn icon if currency is DKK", () => {
    rendered = shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ valuableType: any; currency: string; }' is... Remove this comment to see the full error message
      <ValuableSymbol
        valuableType={cashValuableType}
        currency={CURRENCIES.DKK}
      />
    );

    expect(rendered.find(WalletTabKroneUnselectedIcon).exists()).toBe(true);
  });

  test("should render cad icon if currency is RUP", () => {
    rendered = shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ valuableType: any; currency: string; }' is... Remove this comment to see the full error message
      <ValuableSymbol
        valuableType={cashValuableType}
        currency={CURRENCIES.INR}
      />
    );

    expect(rendered.find(WalletTabRupeeUnselectedIcon).exists()).toBe(true);
  });

  test("should render cad icon if currency is USD", () => {
    rendered = shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ valuableType: any; currency: string; }' is... Remove this comment to see the full error message
      <ValuableSymbol
        valuableType={cashValuableType}
        currency={CURRENCIES.USD}
      />
    );

    expect(rendered.find(WalletTabDollarUnselectedIcon).exists()).toBe(true);
  });
});
