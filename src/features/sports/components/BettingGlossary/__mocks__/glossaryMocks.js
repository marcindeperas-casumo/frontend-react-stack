import { DICTIONARY_TERM_QUERY } from "Features/sports/components/DictionaryTerm";
import { GLOSSARY_QUERY } from "Features/sports/components/BettingGlossary";

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
  {
    request: {
      query: GLOSSARY_QUERY,
    },
    result: {
      data: {
        glossary: [
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
            id: "accumulator",
            term: "Accumulator",
            aka: "",
            definition: `
              <span data-glossary-term="combination_bet">
                See 'combination bet'.
              </span>
            `,
          },
          {
            id: "american_odds",
            term: "American Odds",
            aka: "Moneyline",
            definition: `
              <span data-glossary-term="odds_format">See 'odds format'.</span>
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
        ],
      },
    },
  },
];
