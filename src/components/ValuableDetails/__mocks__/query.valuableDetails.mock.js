import { ValuableDetailsQuery } from "../ValuableDetails.graphql";
import translations from "Models/valuables/__mocks__/valuableDetailsTranslations.mock";

export default {
  request: {
    query: ValuableDetailsQuery,
    variables: {},
  },
  result: {
    data: {
      ...translations
    },
  },
};
