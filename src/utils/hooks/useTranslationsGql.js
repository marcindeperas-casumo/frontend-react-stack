// @flow
import * as R from "ramda";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { generateQueries } from "./useTranslationsGql.utils";

export function useTranslationsGql<T: Object>(
  translations: T
): { loading: boolean, t: { [$Keys<T>]: ?string } } {
  const defaultTranslations = R.map(() => null, translations);
  const query = gql`
    query TranslationsQuery {
      ${generateQueries(translations)}
    }
  `;

  const { data, loading } = useQuery(query);

  return loading || !data
    ? { loading, t: defaultTranslations }
    : { loading, t: R.map(x => x.text, data) };
}
