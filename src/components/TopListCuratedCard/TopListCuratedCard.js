// @flow
import * as React from "react";
// __FIX__ Why can't it resolve "Components/CuratedCard"?
import { CuratedCardContainer as CuratedCard } from "Components/CuratedCard/CuratedCardContainer";
import { MARKETS } from "Src/constants";

export const CURATED_COMPONENT_GENERAL_SLUG = "welcome-offer-test";
export const CURATED_COMPONENT_JP_CASHBACK_SLUG =
  "vertical-specific-cashback-promo-slot_machine";

export const CASHBACK_WELCOME_OFFER_ID = "wo-33cashbackupto333";

export const getWelcomeOfferSlug = (welcomeOfferId: string, market: string) => {
  const isJpMarket = market === MARKETS.jp_ja;
  const isCashbackWelcomeOffer = welcomeOfferId === CASHBACK_WELCOME_OFFER_ID;

  if (isJpMarket && isCashbackWelcomeOffer) {
    return CURATED_COMPONENT_JP_CASHBACK_SLUG;
  }

  return CURATED_COMPONENT_GENERAL_SLUG;
};

type Props = {
  /** The slug of the curated card to render. */
  card: string | Array<string>,
  /** A boolean indicating if the player has deposited yet or not. */
  hasDeposited: boolean,
  market: string,
  welcomeOfferId: string,
  /** Will enforce showing the curated content specified by the "card" property if set to TRUE. (bypasses the welcome-offer logic) */
  enforceOriginalSlug?: boolean,
};

// We cannot name the property to "slug" easily here, we have to keep it as "card" as it getting
// the properties from the CMS and there it is used as "card" in a lot of places.
export const TopListCuratedCard = ({
  card,
  hasDeposited,
  market,
  welcomeOfferId,
  enforceOriginalSlug = false,
}: Props) => {
  const normalizedSlug = Array.isArray(card) ? card[0] : card;
  const shouldShowWelcomeOffer = !hasDeposited && !enforceOriginalSlug;
  const computedSlug = shouldShowWelcomeOffer
    ? getWelcomeOfferSlug(welcomeOfferId, market)
    : normalizedSlug;

  return (
    <div className="u-margin-top--md@mobile u-margin-x--md@mobile u-margin-x--3xlg@desktop">
      <div className="o-wrapper u-overflow-hidden t-border-r--md">
        <CuratedCard slug={computedSlug} />
      </div>
    </div>
  );
};
