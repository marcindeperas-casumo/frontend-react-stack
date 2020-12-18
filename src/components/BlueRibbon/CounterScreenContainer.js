import React from "react";
import { useSelector } from "react-redux";
import { useLocale } from "Utils/hooks";
import { currencySelector } from "Models/handshake";
import { CounterScreen } from "./CounterScreen";

export const CounterScreenContainer = props => {
  const locale = useLocale();
  const currency = useSelector(currencySelector);

  const mergedProps = {
    ...props,
    locale,
    currency,
  };

  return <CounterScreen {...mergedProps} />;
};
