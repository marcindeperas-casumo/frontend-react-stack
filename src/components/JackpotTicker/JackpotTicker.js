// @flow
import React from "react";
import Badge from "@casumo/cmp-badge";
import { formatCurrency } from "Utils";
import type { Jackpot } from "Types/jackpot";

type Props = {
  ...Jackpot,
  className: string,
  locale: string,
};

export default function JackpotTicker({ value, className, locale }: Props) {
  if (!value) {
    return null;
  }

  const { currency, amount } = value;

  return (
    <Badge className={className}>
      {formatCurrency({ currency, locale, value: amount })}
    </Badge>
  );
}
