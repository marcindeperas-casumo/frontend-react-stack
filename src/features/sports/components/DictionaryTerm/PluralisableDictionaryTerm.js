// @flow

import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { compile, NOT_FOUND_STRING, LOADING_STRING } from "./utils";
import type { Replacements } from "./utils";

type Props = {
  /** The dictionary key for this translation, final key used will be `{key}.(singular/plural) depending on isPlural` */
  termKey: string,
  /** Whether the component should use the plural or singular version on the component */
  isPlural?: boolean,
  /** A replacements map, for variable replacements in the dictionary term string */
  replacements?: Replacements,
  /** Optional children, if provided this will be render prop component so children is a function of string -> Node */
  children?: (dictionaryTerm: string) => React.Node,
};

class PluralisableDictionaryTermTypedQuery extends Query<
  PluralisableDictionaryTermQuery,
  PluralisableDictionaryTermQueryVariables
> {}

export const PLURALISABLE_DICTIONARY_TERM_QUERY = gql`
  query PluralisableDictionaryTermQuery(
    $singularKey: String!
    $pluralKey: String!
  ) {
    singularTerm: dictionaryTerm(key: $singularKey)
    pluralTerm: dictionaryTerm(key: $pluralKey)
  }
`;

export const createSingularKey = (termKey: string) => `${termKey}.singular`;
export const createPluralKey = (termKey: string) => `${termKey}.plural`;

const PluralisableDictionaryTerm = ({
  termKey,
  replacements,
  isPlural = false,
  children,
}: Props): React.Node => (
  <PluralisableDictionaryTermTypedQuery
    query={PLURALISABLE_DICTIONARY_TERM_QUERY}
    variables={{
      singularKey: createSingularKey(termKey),
      pluralKey: createPluralKey(termKey),
    }}
  >
    {({ data, loading }) => {
      /* eslint-disable fp/no-let, fp/no-mutation */
      let dictionaryTerm = NOT_FOUND_STRING;

      if (loading) {
        dictionaryTerm = LOADING_STRING;
      }

      if (
        data &&
        typeof data.singularTerm === "string" &&
        typeof data.pluralTerm === "string"
      ) {
        dictionaryTerm = compile(
          isPlural ? data.pluralTerm : data.singularTerm,
          replacements
        );
      }
      /* eslint-enable fp/no-let, fp/no-mutation */

      // if children provided this is a render prop component, if not return the translation
      return children ? children(dictionaryTerm) : dictionaryTerm;
    }}
  </PluralisableDictionaryTermTypedQuery>
);

export default PluralisableDictionaryTerm;
