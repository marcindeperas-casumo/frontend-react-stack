// @flow
import * as React from "react";
// __FIX__ Why can't it resolve "Components/CuratedCard"?
import { CuratedCardContainer as CuratedCard } from "Components/CuratedCard/CuratedCardContainer";

export const WELCOME_OFFER_SLUG = "welcome-offer-test";

type Props = {
  /** The slug of the curated card to render. */
  card: string | Array<string>,
  /** A boolean indicating if the player has deposited yet or not. */
  hasDeposited: boolean,
  /** Will enforce showing the curated content specified by the "card" property if set to TRUE. (bypasses the welcome-offer logic) */
  enforceOriginalSlug?: boolean,
};

// We cannot name the property to "slug" easily here, we have to keep it as "card" as it getting
// the properties from the CMS and there it is used as "card" in a lot of places.
export const TopListCuratedCard = ({
  card,
  hasDeposited,
  enforceOriginalSlug = false,
}: Props) => {
  const normalizedSlug = Array.isArray(card) ? card[0] : card;
  const shouldShowWelcomeOffer = !hasDeposited && !enforceOriginalSlug;
  const computedSlug = shouldShowWelcomeOffer
    ? WELCOME_OFFER_SLUG
    : normalizedSlug;

  return (
    <div className="u-margin-top--md@mobile u-margin-top--md@phablet u-margin-top--lg@tablet u-margin-x--md@mobile u-margin-x--md@phablet u-margin-x--3xlg@tablet t-border-r--md u-overflow-hidden t-border-r--none@desktop">
      <CuratedCard slug={computedSlug} />
    </div>
  );
};
