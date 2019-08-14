import React from "react";
import { Query } from "react-apollo";
import { ValuableDetailsQuery } from "./queries/ValuableDetails.graphql";
import { ValuableDetails } from "./ValuableDetails";

class ValuableDetailsTypedQuery extends Query<ValuableDetailsQuery, null> {}

export const ValuableDetailsContainer = props => (
  <ValuableDetailsTypedQuery query={ValuableDetailsQuery}>
    {({ loading, data }) => {
      if (loading) {
        return null;
      }

      return (
        <ValuableDetails loading={loading} {...props} translations={data} />
      );
    }}
  </ValuableDetailsTypedQuery>
);
