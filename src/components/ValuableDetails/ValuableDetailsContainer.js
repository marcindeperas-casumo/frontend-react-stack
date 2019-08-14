import React from "react";
import { Query } from "react-apollo";
import { ValuableDetailsQuery } from "./queries/ValuableDetails.graphql";
import { ValuableDetails } from "./ValuableDetails";

class ValuableDetailsTypedQuery extends Query<ValuableDetailsQuery, null> {}

export const ValuableDetailsContainer = props => (
  <ValuableDetailsTypedQuery query={ValuableDetailsQuery}>
    {({ data }) => {
      return <ValuableDetails {...props} translations={data} />;
    }}
  </ValuableDetailsTypedQuery>
);

// loading={loading}
// error={error && error.message}
