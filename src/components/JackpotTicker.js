import React from "react";
import Badge from "@casumo/cmp-badge";

export default function JackpotTicker({ formattedJackpotAmount, className }) {
  if (!formattedJackpotAmount) {
    return null;
  }

  return <Badge className={className}>{formattedJackpotAmount}</Badge>;
}
