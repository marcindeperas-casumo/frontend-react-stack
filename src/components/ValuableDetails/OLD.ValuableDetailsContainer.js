// import React from "react";
// import { Query } from "react-apollo";
// import { ValuableDetailsLabelsQuery as LocalQuery } from "./ValuableDetailsLabels.graphql";
// import { ValuableDetails } from "./ValuableDetails";

// class ValuableDetailsLabelsTypedQuery extends Query<
//   ValuableDetailsLabelsQuery,
//   null
// > {}

// export const ValuableDetailsContainer = props => (
//   <ValuableDetailsLabelsTypedQuery query={LocalQuery}>
//     {({ loading, error, refetch, data: labels }) => (
//       <ValuableDetails
//         loading={loading}
//         error={error && error.message}
//         labels={labels}
//         refetch={refetch}
//         {...props}
//       />
//     )}
//   </ValuableDetailsLabelsTypedQuery>
// );
