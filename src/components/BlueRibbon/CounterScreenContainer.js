import React from "react";
import { useSelector } from "react-redux";
import { useLocale } from "Utils/hooks";
import { currencySelector } from "Models/handshake";
import { CounterScreen } from "./CounterScreen";

export const CounterScreenContainer = ({ amount, type, onClose }) => {
  const locale = useLocale();
  const currency = useSelector(currencySelector);

  const props = {
    amount,
    type,
    locale,
    currency,
    onClose,
  };

  return <CounterScreen {...props} />;
};
