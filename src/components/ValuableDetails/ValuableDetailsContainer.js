import React from "react";
import { Query } from "react-apollo";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { ValuableDetailsQuery } from "./ValuableDetails.graphql"; // to convert to js
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
