import React from "react";
import { ValuableCard } from "Components/ValuableCard";

export const ValuableCardDetailsThumbnail = (translations, valuable) => (
  <div className="c-valuable-details__valuable-card u-position--relative">
    <ValuableCard
      translations={translations}
      {...valuable}
      caveat={null}
      className="t-box-shadow--lg"
    />
  </div>
);
