// @flow
import * as React from "react";
import { CuratedCard } from "Components/CuratedCard";

export const WELCOME_OFFER_SLUG = "welcome-offer-test";

type Props = {
  /** The slug of the curated card to render. */
  slug: string | Array<string>,
  /** A boolean indicating if the player has deposited yet or not. */
  hasDeposited: boolean,
};

export const TopListCuratedCard = ({ slug, hasDeposited }: Props) => {
  const normalizedSlug = Array.isArray(slug) ? slug[0] : slug;
  const computedSlug = hasDeposited ? normalizedSlug : WELCOME_OFFER_SLUG;

  return (
    <div className="u-margin-top--md@mobile u-margin-top--md@phablet u-margin-top--lg@tablet u-margin-x--md@mobile u-margin-x--md@phablet u-margin-x--3xlg@tablet t-border-r--md u-overflow-hidden t-border-r--none@desktop">
      <CuratedCard slug={computedSlug} />
    </div>
  );
};
