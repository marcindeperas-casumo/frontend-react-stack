// @flow
import * as R from "ramda";
import { useQuery, gql } from "@apollo/client";
import { generateQueries } from "./useTranslationsGql.utils";

export function useTranslationsGql<T: Object>(
  translations: T
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '$Keys'.
): { loading: boolean, t: { [$Keys<T>]: ?string } } {
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  const defaultTranslations = R.map(() => null, translations);
  const query = gql`
    query TranslationsQuery {
      ${generateQueries(      
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'T' is not assignable to paramete... Remove this comment to see the full error message
translations)}
    }
  `;

  const { data, loading } = useQuery(query);

  return !data
    ? { loading, t: defaultTranslations }
    : { loading, t: R.map(x => x.text, data) };
}
