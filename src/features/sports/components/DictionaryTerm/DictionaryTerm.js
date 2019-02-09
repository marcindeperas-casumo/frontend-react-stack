// @flow

import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { compile, NOT_FOUND_STRING, LOADING_STRING } from "./utils";
import type { Replacements } from "./utils";

type Props = {
  /** The dictionary key for this translation */
  termKey: string,
  /** A replacements map, for variable replacements in the dictionary term string */
  replacements?: Replacements,
  /** Optional children, if provided this will be render prop component so children is a function of string -> Node */
  children?: (dictionaryTerm: string) => React.Node,
};

class DictionaryTermTypedQuery extends Query<
  DictionaryTermQuery,
  DictionaryTermQueryVariables
> {}

export const DICTIONARY_TERM_QUERY = gql`
  query DictionaryTermQuery($key: String!) {
    dictionaryTerm(key: $key)
  }
`;

const DictionaryTerm = ({
  termKey,
  replacements,
  children,
}: Props): React.Node => (
  <DictionaryTermTypedQuery
    query={DICTIONARY_TERM_QUERY}
    variables={{ key: termKey }}
  >
    {({ data, loading, error }) => {
      /* eslint-disable fp/no-let, fp/no-mutation */
      let dictionaryTerm = NOT_FOUND_STRING;

      if (loading) {
        dictionaryTerm = LOADING_STRING;
      }

      if (data && typeof data.dictionaryTerm === "string") {
        dictionaryTerm = compile(data.dictionaryTerm, replacements);
      }
      /* eslint-enable fp/no-let, fp/no-mutation */

      return children ? children(dictionaryTerm) : dictionaryTerm;
    }}
  </DictionaryTermTypedQuery>
);

export default DictionaryTerm;
