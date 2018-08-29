import React from "react";
import Badge from "@casumo/cmp-badge";

export default function JackpotTicker({ formattedJackpotAmount }) {
  if (!formattedJackpotAmount) {
    return null;
  }

  return <Badge>{formattedJackpotAmount}</Badge>;
}
