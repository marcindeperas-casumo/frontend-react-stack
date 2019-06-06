import { DICTIONARY_TERM_QUERY } from "Features/sports/components/DictionaryTerm";

export const mocks = [
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "glossary.heading",
      },
    },
    result: {
      data: {
        dictionaryTerm: "Glossary",
      },
    },
  },
];
