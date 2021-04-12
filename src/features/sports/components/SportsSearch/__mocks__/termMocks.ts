import { DICTIONARY_TERM_QUERY } from "Features/sports/components/DictionaryTerm/DictionaryTerm";

export default [
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "search-results.heading.popular",
      },
    },
    result: {
      data: {
        dictionaryTerm: "Popular searches",
      },
    },
  },
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "search-results.heading.historic",
      },
    },
    result: {
      data: {
        dictionaryTerm: "Your searches",
      },
    },
  },
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "search-results.no-results",
      },
    },
    result: {
      data: {
        dictionaryTerm: "No results",
      },
    },
  },
];
