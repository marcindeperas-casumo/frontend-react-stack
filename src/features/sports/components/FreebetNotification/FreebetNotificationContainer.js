import React from "react";
import * as R from "ramda";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import * as storage from "Lib/storage";
import { FreebetNotification } from "./FreebetNotification";

export const IS_FREEBET_NOTIFICATION_HIDDEN_STORAGE_KEY =
  "isFreebetNotificationHidden";

const FREEBET_QUERY = gql`
  query FREEBET_QUERY {
    player {
      valuables(valuableType: freeBetLocked) {
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
  const isHiddenByDefault = storage.get(
    IS_FREEBET_NOTIFICATION_HIDDEN_STORAGE_KEY,
    false
  );
  const onClose = () =>
    storage.set(IS_FREEBET_NOTIFICATION_HIDDEN_STORAGE_KEY, true);

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
