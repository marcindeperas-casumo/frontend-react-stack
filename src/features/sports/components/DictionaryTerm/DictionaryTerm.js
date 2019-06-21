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

const getDictionaryTerm = (
  data?: DictionaryTermQuery,
  loading: boolean,
  replacements?: Replacements
): string => {
  if (loading) {
    return LOADING_STRING;
  }

  if (data && typeof data.dictionaryTerm === "string") {
    return compile(data.dictionaryTerm, replacements);
  }

  return NOT_FOUND_STRING;
};

export const DictionaryTerm = ({
  termKey,
  replacements,
  children,
}: Props): React.Node => (
  <DictionaryTermTypedQuery
    query={DICTIONARY_TERM_QUERY}
    variables={{ key: termKey }}
  >
    {({ data, loading }) => {
      const dictionaryTerm = getDictionaryTerm(data, loading, replacements);
      return children ? children(dictionaryTerm) : dictionaryTerm;
    }}
  </DictionaryTermTypedQuery>
);
