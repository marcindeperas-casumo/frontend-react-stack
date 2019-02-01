// @flow
import React from "react";
import Badge from "@casumo/cmp-badge";
import type { JackpotInfo } from "Types/jackpotInfo";

type Props = {
  className: string,
} & JackpotInfo;

export default function JackpotTicker({
  formattedJackpotAmount,
  className,
}: Props) {
  if (!formattedJackpotAmount) {
    return null;
  }

  return <Badge className={className}>{formattedJackpotAmount}</Badge>;
}
