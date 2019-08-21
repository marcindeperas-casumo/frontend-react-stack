import React from "react";
import { Query } from "react-apollo";
import { launchGame } from "Models/games";
import { noop } from "Utils";
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
        <ValuableDetails
          onLaunchGame={
            props.valuableDetails.slug
              ? () => launchGame(props.valuableDetails.slug)
              : noop
          }
          loading={loading}
          {...props}
          translations={data}
        />
      );
    }}
  </ValuableDetailsTypedQuery>
);
