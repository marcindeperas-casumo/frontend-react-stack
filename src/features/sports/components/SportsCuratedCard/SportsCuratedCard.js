// @flow
import * as React from "react";
import { CuratedCardContainer as CuratedCard } from "Components/CuratedCard/CuratedCardContainer";
import { SPORTS_HOME_PAGE_PATH } from "Features/sports/components/SportsNav/sportsNavUtils";
import "./SportsCuratedCard.scss";

// slug curated.sports
export const CMS_SLUG = "sports";

type Props = {
  hasDeposited: boolean,
  currentHash?: string,
};

export const SportsCuratedCard = ({
  hasDeposited,
  currentHash = "",
}: Props) => {
  const isOnSportsLandingPage = currentHash === `#${SPORTS_HOME_PAGE_PATH}`;
  // inverted WelcomeOfferCuratedCard logic
  // we show it when the other is not active
  if (!hasDeposited || !isOnSportsLandingPage) {
    return null;
  }

  return (
    <div className="u-overflow-hidden">
      <div className="u-margin-top--sm u-margin-x--md t-border-r--md u-overflow-hidden">
        <CuratedCard slug={CMS_SLUG} className="c-sports-curated-card" />
      </div>
    </div>
  );
};
