import { DICTIONARY_TERM_QUERY } from "Features/sports/components/DictionaryTerm/DictionaryTerm";

export default [
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "desktop.tab.home",
      },
    },
    result: {
      data: {
        dictionaryTerm: "Sports",
      },
    },
  },
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "desktop.tab.search",
      },
    },
    result: {
      data: {
        dictionaryTerm: "Search",
      },
    },
  },
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "desktop.tab.bet-history",
      },
    },
    result: {
      data: {
        dictionaryTerm: "My bets",
      },
    },
  },
];
