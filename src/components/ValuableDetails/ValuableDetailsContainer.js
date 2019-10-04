import React from "react";
import { useQuery } from "@apollo/react-hooks";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { ValuableDetailsQuery } from "./ValuableDetails.graphql"; // to convert to js
import { ValuableDetails } from "./ValuableDetails";

export const ValuableDetailsContainer = props => {
  const { data, loading } = useQuery(ValuableDetailsQuery);

  return loading ? null : <ValuableDetails {...props} translations={data} />;
};
