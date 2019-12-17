import React, { useState } from "react";
import * as R from "ramda";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
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
  const lockedFreebets = getValuablesByState(VALUABLE_STATES.LOCKED)(valuables);
  const latestLockedFreebet = getLatestValuable(lockedFreebets);

  if (
    isHidden ||
    loading ||
    !latestLockedFreebet ||
    getPersistedIsHidden(latestLockedFreebet?.id)
  ) {
    return null;
  }

  return (
    <FreebetNotification
      backgroundImage={latestLockedFreebet.backgroundImage}
      currency={latestLockedFreebet.currency}
      expiryDate={latestLockedFreebet.expiryDate}
      market={latestLockedFreebet.market}
      valuableState={latestLockedFreebet.valuableState}
      valuableType={latestLockedFreebet.valuableType}
      title={latestLockedFreebet.title}
      description={latestLockedFreebet.content}
      caveat={latestLockedFreebet.caveat}
      onClose={() => {
        setIsHidden(true);
        persistIsHidden(latestLockedFreebet.id);
      }}
    />
  );
};
