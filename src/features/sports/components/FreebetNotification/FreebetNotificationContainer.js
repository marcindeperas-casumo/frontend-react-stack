import React from "react";
import * as R from "ramda";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import * as storage from "Services/storage";
import { VALUABLE_STATES } from "Models/valuables";
import { FreebetNotification } from "./FreebetNotification";

// We are persisting the users action of hiding the notification to localStorage.
export const IS_HIDDEN_STORAGE_KEY = "isFreebetNotificationHidden";

const FREEBET_QUERY = gql`
  query FREEBET_QUERY {
    player {
      valuables(valuableType: freeBet) {
        id
        backgroundImage
        currency
        expiryDate
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
  const [valuable = {}] = R.pathOr([], ["player", "valuables"], data);
  const isHiddenByDefault = storage.get(IS_HIDDEN_STORAGE_KEY, false);
  const onClose = () => storage.set(IS_HIDDEN_STORAGE_KEY, true);

  // Only display it for locked free bets.
  // This is something that we would like to change to support both, but as we are short on time we would like go in small steps.
  // We have put it here in order to not pollute the generic the FreebetNotification component unnecessarily.
  if (valuable.valuableState !== VALUABLE_STATES.LOCKED) {
    return null;
  }

  return loading ? null : (
    <FreebetNotification
      backgroundImage={valuable.backgroundImage}
      currency={valuable.currency}
      expiryDate={valuable.expiryDate}
      market={valuable.market}
      valuableState={valuable.valuableState}
      valuableType={valuable.valuableType}
      title={valuable.title}
      description={valuable.content}
      caveat={valuable.caveat}
      onClose={onClose}
      isHiddenByDefault={isHiddenByDefault}
    />
  );
};
