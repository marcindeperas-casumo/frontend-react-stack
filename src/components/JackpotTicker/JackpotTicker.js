import React from "react";
import Badge from "@casumo/cmp-badge";

export default function JackpotTicker({
  formattedJackpotAmount,
  className,
  size = "sm",
}) {
  if (!formattedJackpotAmount) {
    return null;
  }

  return (
    <Badge className={className} size={size}>
      {formattedJackpotAmount}
    </Badge>
  );
}
