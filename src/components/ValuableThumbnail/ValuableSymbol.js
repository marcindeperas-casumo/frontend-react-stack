import React from "react";
import { compose, prop } from "ramda";
import Text from "@casumo/cmp-text";
import { CouponIcon } from "@casumo/cmp-icons";
import { getSymbolForCurrency } from "Utils";
import { VALUABLE_TYPES, VALUABLE_SPIN_TYPES } from "Models/valuables";
import {
  DepositIcon,
  BasicSpinsIcon,
  BonusSpinsIcon,
  SuperSpinsIcon,
  MegaSpinsIcon,
} from "./icons";

const VALUABLE_ICON = {
  [VALUABLE_TYPES.DEPOSIT]: DepositIcon,
  [VALUABLE_TYPES.SPINS]: {
    [VALUABLE_SPIN_TYPES.BASIC_SPINS]: BasicSpinsIcon,
    [VALUABLE_SPIN_TYPES.BONUS]: BonusSpinsIcon,
    [VALUABLE_SPIN_TYPES.SUPER]: SuperSpinsIcon,
    [VALUABLE_SPIN_TYPES.MEGA]: MegaSpinsIcon,
  },
  [VALUABLE_TYPES.SPORT]: CouponIcon,
};

const CashSymbol = ({ locale, currency, fontSize }) => {
  const currencySymbol = getSymbolForCurrency({
    currency,
    locale,
  });

  return (
    <Text tag="div" size={fontSize} className="u-font-weight-bold">
      {currencySymbol}
    </Text>
  );
};

export const ValuableSymbol = ({
  currency,
  market,
  valuableType,
  spinType,
  fontSize = "lg",
}) => {
  // eslint-disable-next-line fp/no-let
  let ValuableSymbolComponent = VALUABLE_ICON[valuableType];

  if (valuableType === VALUABLE_TYPES.CASH) {
    return (
      <CashSymbol currency={currency} market={market} fontSize={fontSize} />
    );
  }

  if (valuableType === VALUABLE_TYPES.SPINS) {
    // eslint-disable-next-line fp/no-mutation
    ValuableSymbolComponent = compose(
      prop(spinType),
      prop(valuableType)
    )(VALUABLE_ICON);
  }

  return <ValuableSymbolComponent className="u-width--full" />;
};
