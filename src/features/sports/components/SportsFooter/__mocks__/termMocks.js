import { DICTIONARY_TERM_QUERY } from "Features/sports/components/DictionaryTerm/DictionaryTerm";

export const mocks = [
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "footer.terms",
      },
    },
    result: {
      data: {
        dictionaryTerm: "Sports T&Cs",
      },
    },
  },
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "footer.glossary",
      },
    },
    result: {
      data: {
        dictionaryTerm: "Glossary",
      },
    },
  },
];
