import React from "react";
import Badge from "@casumo/cmp-badge";

export default function JackpotTicker({ jackpotAmount }) {
  if (!jackpotAmount) {
    return null;
  }

  return <Badge>{jackpotAmount}</Badge>;
}
