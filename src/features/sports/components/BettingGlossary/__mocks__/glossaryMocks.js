import { DICTIONARY_TERM_QUERY } from "Features/sports/components/DictionaryTerm";
import { GLOSSARY_QUERY } from "Features/sports/components/BettingGlossary";
const glossary = {
  glossary: [
    {
      id: "accumulator",
      term: "Accumulator",
      aka: "",
      definition: `
      <span data-glossary-link="combination_bet">
        See 'combination bet'.
      </span>
    `,
    },
    {
      id: "american_odds",
      term: "American Odds",
      aka: "Moneyline",
      definition: `
      <span data-glossary-link="odds_format">See 'odds format'.</span>
    `,
    },
    {
      id: "asian_handicap",
      term: "Asian Handicap",
      aka: "",
      definition: `
        A bet market that is popular in football, where one team
        receives a “virtual head start”, leading the game by an amount
        of goals before the game starts. The team who scores the most
        with the handicap applied is the winner. See ‘handicap’.
    `,
    },
    {
      id: "bet",
      term: "Full-time/Match Odds",
      aka: "",
      definition:
        "The bet is to take a position on the outcome of a sporting match. There are different types of bets: Single, Combination, System",
    },
    {
      id: "bet_market",
      term: "Bet Market",
      aka: "Bet Type",
      definition:
        "A specific type or category of bet available on a particular event. (e.g. Full-time, Draw no bet, Corners, etc.)",
    },
    {
      id: "combination_bet",
      term: "Combination Bet",
      aka: "Combi/Multiple/Accumulator/Acca",
      definition:
        "In a combination bet, at least two selections are combined. The overall odds result from the multiplication of the odds of the individual selections. All outcomes must be successful for you to win the bet. A combination bet on 2 selections is called a double, while 3 selections are called a treble.",
    },
    {
      id: "full_match_time_odds",
      term: "Full-time/Match Odds",
      aka: "",
      definition: `
        A popular bet market where you predict the outcome at the end of
        the match:
        <ul>
          <li>Home team wins (or the team that is listed first)</li>
          <li>Draw - match ends in a tie</li>
          <li>Away team wins (or the team that is listed second)</li>
        </ul>
      `,
    },
    {
      id: "odds_format",
      term: "Odds Format",
      aka: "",
      definition: `
        Odds are numerical depiction of probability of a particular outcome. If we use a coin toss as an example,
        there’s a 50% chance of it being either heads or tails and we can show that in a few different ways.
        <ul>
          <li>Decimal (European): 2.0</li>
          <li>Fractional (UK): 1/1, or even money</li>
          <li>American (US):  +100 <em>(<strong>+</strong>indicates the amount that would be won for every 100 bet placed. - indicates how much must be bet to win 100.)</em></li>
        </ul>
      `,
    },
  ],
};

const dictionaryMocks = [
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
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "glossary.aka",
      },
    },
    result: {
      data: {
        dictionaryTerm: "Also known as",
      },
    },
  },
  {
    request: {
      query: DICTIONARY_TERM_QUERY,
      variables: {
        key: "glossary.error",
      },
    },
    result: {
      data: {
        dictionaryTerm: "Glossary failed to load",
      },
    },
  },
];

const loading = [
  ...dictionaryMocks,
  {
    request: {
      query: GLOSSARY_QUERY,
    },
    result: {
      data: false,
    },
  },
];

const success = [
  ...dictionaryMocks,
  {
    request: {
      query: GLOSSARY_QUERY,
    },
    result: {
      data: glossary,
    },
  },
];

const error = [
  ...dictionaryMocks,
  {
    request: {
      query: GLOSSARY_QUERY,
    },
    errors: [new Error("Failed GraphQL query.")],
  },
];

export const mocks = { loading, success, error };
