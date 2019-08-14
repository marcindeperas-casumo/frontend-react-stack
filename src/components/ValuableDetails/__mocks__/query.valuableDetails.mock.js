import { ValuableDetailsQuery } from "../queries/ValuableDetails.graphql";
import { labels } from "./mocks";

export default {
  request: {
    query: ValuableDetailsQuery,
    variables: {},
  },
  result: {
    data: {
      ...labels
    },
  },
};
