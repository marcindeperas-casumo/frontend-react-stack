// @flow
import * as React from "react";
import { CuratedCardContainer as CuratedCard } from "Components/CuratedCard/CuratedCardContainer";
import { MobileAndTablet } from "Components/ResponsiveLayout";
import "./SportsCuratedCard.scss";

// slug curated.sports
export const CMS_SLUG = "sports";

type Props = {
  hasDeposited: boolean,
};

export const SportsCuratedCard = ({ hasDeposited }: Props) => {
  // inverted WelcomeOfferCuratedCard logic
  // we show it when the other is not active
  if (!hasDeposited) {
    return null;
  }

  return (
    <MobileAndTablet>
      <div className="u-overflow-hidden">
        <div className="u-margin-top--sm u-margin-x--md t-border-r--md u-overflow-hidden">
          <CuratedCard slug={CMS_SLUG} className="c-sports-curated-card" />
        </div>
      </div>
    </MobileAndTablet>
  );
};
