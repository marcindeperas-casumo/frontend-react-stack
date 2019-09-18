// @flow
import * as React from "react";
import { CuratedCard } from "Components/CuratedCard";

export const CMS_SLUG = "welcome-offer-sports";

type Props = {
  vertical: string,
  hasDeposited: boolean,
};

export const WelcomeOfferCuratedCard = ({ vertical, hasDeposited }: Props) => {
  const isSportsPlayer = vertical === "SPORTS";

  if (!isSportsPlayer || hasDeposited) {
    return null;
  }

  return <CuratedCard slug={CMS_SLUG} />;
};
