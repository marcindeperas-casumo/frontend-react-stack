// @flow
import * as React from "react";
import { CuratedCard } from "Components/CuratedCard";
import { Mobile } from "Components/ResponsiveLayout";
import { VERTICALS } from "Src/constants";
import "./WelcomeOfferCuratedCard.scss";

export const CMS_SLUG = "welcome-offer-sports";

type Props = {
  vertical: string,
  hasDeposited: boolean,
};

export const WelcomeOfferCuratedCard = ({ vertical, hasDeposited }: Props) => {
  const isSportsPlayer = vertical === VERTICALS.SPORTS;

  if (!isSportsPlayer || hasDeposited) {
    return null;
  }

  return (
    <Mobile>
      <div className="u-overflow-hidden">
        <div className="u-margin-y--md u-margin-x--md t-border-r--md u-overflow-hidden">
          <CuratedCard
            slug={CMS_SLUG}
            className="c-sports-welcome-offer-card"
          />
        </div>
      </div>
    </Mobile>
  );
};
