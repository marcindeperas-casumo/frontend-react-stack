// @flow
import * as React from "react";
import { CuratedCard } from "Components/CuratedCard";
import { VERTICALS } from "Src/constants";

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
    <div className="u-margin-y--md u-margin-x--md t-border-r--md u-overflow-hidden">
      <CuratedCard slug={CMS_SLUG} />
    </div>
  );
};
