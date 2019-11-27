// @flow
import React from "react";
import Badge from "@casumo/cmp-badge";
import type { Jackpot } from "Types/jackpot";

type Props = {
  className: string,
} & Jackpot;

export default function JackpotTicker({ value, className }: Props) {
  if (!value) {
    return null;
  }

  const { currency, amount } = value;
  const formattedAmount = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency,
  }).format(amount);

  return <Badge className={className}>{formattedAmount}</Badge>;
}
