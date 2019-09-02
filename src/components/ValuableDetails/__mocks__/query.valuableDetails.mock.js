import { ValuableDetailsQuery } from "../ValuableDetails.graphql";
import translations from "Models/valuables/__mocks__/valuableDetailsTranslations.mock.json";

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
