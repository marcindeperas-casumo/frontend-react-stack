import { DICTIONARY_TERM_QUERY } from "../DictionaryTerm";
import { PLURALISABLE_DICTIONARY_TERM_QUERY } from "../PluralisableDictionaryTerm";

const dictionary = [
  {
    key: "favourite-sports-selector.title",
    value: "Choose sports",
  },
  {
    key: "favourite-sports-selector.intro",
    value:
      "Select your favourite sports below to customise your experience. You can always change your selection later.",
  },
  {
    key: "favourite-sports-selector.intro.sports",
    value:
      "Hola sports player! Select your favourite sports below to customise your experience. You can always change your selection later.",
  },
  {
    key: "favourite-sports-selector.heading.popular",
    value: "Popular sports",
  },
  {
    key: "favourite-sports-selector.selectall",
    value: "Select all sports",
  },
  {
    key: "favourite-sports-selector.heading.all",
    value: "All sports",
  },
  {
    key: "favourite-sports-selector.button.singular",
    value: "Choose {sportsCount} sport",
  },
  {
    key: "favourite-sports-selector.button.plural",
    value: "Choose {sportsCount} sports",
  },
  {
    key: "favourite-sports-selector.suggestion",
    value: "We added 5 leagues you may like. You can customise them.",
  },
  {
    key: "favourite-sports-selector.suggestion.button",
    value: "Add",
  },
  {
    key: "favourite-competitions-selector.title",
    value: "Choose leagues",
  },
  {
    key: "favourite-competitions-selector.intro",
    value:
      "For {sportName}, you can also give more prominence to the leagues you follow.",
  },
  {
    key: "favourite-competitions-selector.button.singular",
    value: "Choose {competitionsCount} league",
  },
  {
    key: "favourite-competitions-selector.button.plural",
    value: "Choose {competitionsCount} leagues",
  },
  {
    key: "favourite-competitions-selector.heading.popular",
    value: "Popular leagues",
  },
  {
    key: "favourite-competitions-selector.heading.all",
    value: "All leagues",
  },
  {
    key: "search-input.placeholder",
    value: "Try a team or league",
  },
  {
    key: "search-results.heading.popular",
    value: "Popular searches",
  },
  {
    key: "search-results.heading.historic",
    value: "Your searches",
  },
  {
    key: "search-results.no-results",
    value: "No search results",
  },
  {
    key: "sports-sub-nav.all",
    value: "All",
  },
];

const keys = dictionary.map(term =>
  term.key.replace(/\.(singular|plural)/gi, "")
);

const getValue = key => {
  const term = dictionary.find(term => term.key === key);
  return term ? term.value : "";
};

export default [
  ...keys.map(key => ({
    request: {
      query: PLURALISABLE_DICTIONARY_TERM_QUERY,
      variables: {
        singularKey: `${key}.singular`,
        pluralKey: `${key}.plural`,
      },
    },
    result: {
      data: {
        singularTerm: getValue(`${key}.singular`),
        pluralTerm: getValue(`${key}.plural`),
      },
    },
  })),

  ...keys.map(key => ({
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: key,
      },
    },
    result: {
      data: {
        dictionaryTerm: getValue(key),
      },
    },
  })),
];
