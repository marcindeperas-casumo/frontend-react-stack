import React from "react";

export const ValuableCardStateBadge = ({ className, text, badgeIcon }) => (
  <div className={className}>
    {badgeIcon && badgeIcon()}
    <strong>{text}</strong>
  </div>
);
