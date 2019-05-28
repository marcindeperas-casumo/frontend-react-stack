import { DICTIONARY_TERM_QUERY } from "Features/sports/components/DictionaryTerm/DictionaryTerm";

export const mocks = [
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "coming-soon.heading",
      },
    },
    result: {
      data: {
        dictionaryTerm: "COMING SOON",
      },
    },
  },
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "coming-soon.message",
      },
    },
    result: {
      data: {
        dictionaryTerm:
          "Sports only works on mobile and tablet devices. We’re working on adding it here, too.",
      },
    },
  },
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "maintenance.heading",
      },
    },
    result: {
      data: {
        dictionaryTerm: "WORKS IN PROGRESS",
      },
    },
  },
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "maintenance.message",
      },
    },
    result: {
      data: {
        dictionaryTerm:
          "We’re currently doing some work on Casumo Sports. Please check again soon.",
      },
    },
  },
];
