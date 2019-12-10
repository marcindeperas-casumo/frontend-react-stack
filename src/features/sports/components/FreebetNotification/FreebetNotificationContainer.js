import React from "react";
import * as R from "ramda";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FreebetNotification } from "./FreebetNotification";

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
    />
  );
};
