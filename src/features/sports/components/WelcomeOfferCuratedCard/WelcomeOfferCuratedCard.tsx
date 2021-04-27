import * as React from "react";
// __FIX__ Why can't it resolve "Components/CuratedCard"?
import { CuratedCardContainer as CuratedCard } from "Components/CuratedCard/CuratedCardContainer";
import { MobileAndTablet } from "Components/ResponsiveLayout";
import { VERTICALS } from "Src/constants";
import { SPORTS_HOME_PAGE_PATH } from "Features/sports/components/SportsNav/sportsNavUtils";
import "./WelcomeOfferCuratedCard.scss";

export const CMS_SLUG = "welcome-offer-sports";

type Props = {
  vertical: string;
  hasDeposited: boolean;
  currentHash?: string;
};

export const WelcomeOfferCuratedCard = ({
  vertical,
  hasDeposited,
  currentHash = "",
}: Props) => {
  const isSportsPlayer = vertical === VERTICALS.SPORTS;
  const isOnSportsLandingPage = currentHash === `#${SPORTS_HOME_PAGE_PATH}`;

  if (!isSportsPlayer || hasDeposited || !isOnSportsLandingPage) {
    return null;
  }

  return (
    <MobileAndTablet>
      <div className="overflow-hidden">
        <div className="m-4 rounded-lg overflow-hidden">
          <CuratedCard
            slug={CMS_SLUG}
            className="c-sports-welcome-offer-card pt-4"
          />
        </div>
      </div>
    </MobileAndTablet>
  );
};
