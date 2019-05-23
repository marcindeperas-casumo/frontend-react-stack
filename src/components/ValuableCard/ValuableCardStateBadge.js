import React from "react";

export const ValuableCardStateBadge = ({ className, text, badgeIcon }) => (
  <div className={className}>
    {badgeIcon && badgeIcon()}
    <span>
      <strong>{text}</strong>
    </span>
  </div>
);
