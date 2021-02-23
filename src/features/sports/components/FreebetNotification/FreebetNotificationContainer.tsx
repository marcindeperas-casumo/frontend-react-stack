import React, { useState } from "react";
import * as R from "ramda";
import { gql, useQuery } from "@apollo/client";
import * as storage from "Services/storage";
import {
  VALUABLE_STATES,
  getValuablesByState,
  getLatestValuable,
} from "Models/valuables";
import { FreebetNotification } from "./FreebetNotification";

// We are persisting the users action of hiding the notification to localStorage.
export const IS_HIDDEN_STORAGE_KEY = "isFreebetNotificationHidden";
const getStorageKey = id => `${IS_HIDDEN_STORAGE_KEY}-${id}`;
const getPersistedIsHidden = id => storage.get(getStorageKey(id), false);
const persistIsHidden = id => storage.set(getStorageKey(id), true);

const FREEBET_QUERY = gql`
  query FREEBET_QUERY {
    player {
      valuables(valuableType: freeBet) {
        id
        backgroundImage
        currency
        expiryDate
        created
        market
        valuableState
        valuableType
        title
        content
        caveat
      }
    }
  }
`;

export const FreebetNotificationContainer = () => {
  const { data, loading } = useQuery(FREEBET_QUERY);
  const [isHidden, setIsHidden] = useState();
  const valuables = R.pathOr([], ["player", "valuables"], data);
  // Only display it for locked free bets.
  // This is something that we would like to change to support both, but as we are short on time we would like go in small steps.
  // We have put it here in order to not pollute the generic the FreebetNotification component unnecessarily.
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'LOCKED' does not exist on type '{}'.
  const lockedFreebets = getValuablesByState([VALUABLE_STATES.LOCKED])(
    valuables
  );
  const latestLockedFreebet = getLatestValuable(lockedFreebets);

  if (
    isHidden ||
    loading ||
    !latestLockedFreebet ||
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'unknown'.
    getPersistedIsHidden(latestLockedFreebet?.id)
  ) {
    return null;
  }

  return (
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'translations' is missing in type '{ back... Remove this comment to see the full error message
    <FreebetNotification
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'backgroundImage' does not exist on type ... Remove this comment to see the full error message
      backgroundImage={latestLockedFreebet.backgroundImage}
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'currency' does not exist on type 'unknow... Remove this comment to see the full error message
      currency={latestLockedFreebet.currency}
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'expiryDate' does not exist on type 'unkn... Remove this comment to see the full error message
      expiryDate={latestLockedFreebet.expiryDate}
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'market' does not exist on type 'unknown'... Remove this comment to see the full error message
      market={latestLockedFreebet.market}
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'valuableState' does not exist on type 'u... Remove this comment to see the full error message
      valuableState={latestLockedFreebet.valuableState}
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'valuableType' does not exist on type 'un... Remove this comment to see the full error message
      valuableType={latestLockedFreebet.valuableType}
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'unknown'.
      title={latestLockedFreebet.title}
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'content' does not exist on type 'unknown... Remove this comment to see the full error message
      description={latestLockedFreebet.content}
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'caveat' does not exist on type 'unknown'... Remove this comment to see the full error message
      caveat={latestLockedFreebet.caveat}
      onClose={() => {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
        setIsHidden(true);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'unknown'.
        persistIsHidden(latestLockedFreebet.id);
      }}
    />
  );
};
