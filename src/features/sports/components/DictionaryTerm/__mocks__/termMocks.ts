import { DICTIONARY_TERM_QUERY } from "../DictionaryTerm";
import {
  PLURALISABLE_DICTIONARY_TERM_QUERY,
  createSingularKey,
  createPluralKey,
} from "../PluralisableDictionaryTerm";

export const WORKING_TERM = {
  key: "test.key.working",
  value: "Working translation",
  pluralValue: "Working translations",
};

export const REPLACEMENT_TERM = {
  key: "test.key.replacement",
  value: "{teamName} have scored {goalCount} goal",
  pluralValue: "{teamName} have scored {goalCount} goals",
  replacements1: { teamName: "Liverpool", goalCount: "1" },
  replacements2: { teamName: "Manchester", goalCount: "0" },
};

export const ERROR_TERM = { key: "test.key.error", value: "Error translation" };

export const mocks = [
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: WORKING_TERM.key,
      },
    },
    result: {
      data: {
        dictionaryTerm: WORKING_TERM.value,
      },
    },
  },
  {
    request: {
      query: PLURALISABLE_DICTIONARY_TERM_QUERY,
      variables: {
        singularKey: createSingularKey(WORKING_TERM.key),
        pluralKey: createPluralKey(WORKING_TERM.key),
      },
    },
    result: {
      data: {
        singularTerm: WORKING_TERM.value,
        pluralTerm: WORKING_TERM.pluralValue,
      },
    },
  },
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: ERROR_TERM.key,
      },
    },

    error: new Error("This dont exist"),
  },
  {
    request: {
      query: PLURALISABLE_DICTIONARY_TERM_QUERY,
      variables: {
        singularKey: createSingularKey(ERROR_TERM.key),
        pluralKey: createPluralKey(ERROR_TERM.key),
      },
    },
    error: new Error("This dont exist"),
  },
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: REPLACEMENT_TERM.key,
      },
    },
    result: {
      data: {
        dictionaryTerm: REPLACEMENT_TERM.value,
      },
    },
  },
  {
    request: {
      query: PLURALISABLE_DICTIONARY_TERM_QUERY,
      variables: {
        singularKey: createSingularKey(REPLACEMENT_TERM.key),
        pluralKey: createPluralKey(REPLACEMENT_TERM.key),
      },
    },
    result: {
      data: {
        singularTerm: REPLACEMENT_TERM.value,
        pluralTerm: REPLACEMENT_TERM.pluralValue,
      },
    },
  },
];
