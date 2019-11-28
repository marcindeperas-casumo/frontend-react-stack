// @flow
import React from "react";
import Badge from "@casumo/cmp-badge";
import { formatCurrency } from "Utils";
import type { Jackpot } from "Types/jackpot";

type Props = {
  ...Jackpot,
  className: string,
};

export default function JackpotTicker({ value, className }: Props) {
  if (!value) {
    return null;
  }

  const { currency, amount } = value;

  return (
    <Badge className={className}>
      {formatCurrency({ currency, locale: navigator.language, value: amount })}
    </Badge>
  );
}
