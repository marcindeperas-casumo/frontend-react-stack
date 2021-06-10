import { DICTIONARY_TERM_QUERY } from "Features/sports/components/DictionaryTerm/DictionaryTerm";

export const mocks = [
    {
        request: {
            query: DICTIONARY_TERM_QUERY,
            variables: {
                key: "sports.sports-jackpots-component-config-page",
            },
        },
        result: {
            data: {
                title: "Casumo ₹10Lakhs of Summer Cash Drops",
                description: "We're celebrating EURO2020 with a ₹10Lakhs giveaway and a chance to win with a bet on any sport.",
                view_odds: "View Odds",
                more_info: "Learn More",
                match_drop: "Match Day Drop",
                mega_drop: "Big Drop",
                won: "WON",
                footer_text: "Minimum ₹100 settled bet to trigger win.",
                background_desktop: {},
                background_mobile: {},
                background_tablet: {},
                modal_title: "Summer Cash Drops",
                modal_content: "We're celebrating EURO2020 this summer by giving you the chance to win a share of ₹10Lakhs when you place a ₹100 bet on any sport during the tournament.<br /><br />\r\n<b>Our Exclusive Drops</b><br /><br />\r\nEvery day of football action during EURO2020 will see a Match Day Drop fall. Plus our Big Drop will be triggered two times during the competition.<br /><br />\r\nEvery settled bet of ₹100 could win not just the Match Day Drop but also a Big Drop too.",
                modal_conditions: "Minimum ₹100 settled bet to trigger win. T&Cs Apply",
                modal_cta: "View EURO 2020 Odds",
                modal_footer: "<b>GENERAL BONUS AND PROMOTION TERMS</b><br />\r\n18+. Minimum bet of ₹10 placed on any sport market to be eligible. Winnings from cash drops are credited in cash and without wagering requirement. settled real money bets only eligible, Cash drop is exclusive to Casumo registered players. Jackpot is progressive & fully funded by Casumo contribution. Valid from 00.01 11/06/2021 to 23:59 CEST, 11/07/2021. T&Cs apply. Please gamble responsibly",
                enable_for_test: "true",
                enable_for_prod: "false",
                potid_match: "pot1",
                potid_mega: "pot2",
                view_odds_link: "filter/football/euro_2020",
                footer_tc_text: "T&Cs Apply",
                footer_tc_link: "bonus-terms-and-conditions",
                last_day: "1628640000000",
                dropped: "DROPPED"
            },
        },
    },
    {
        request: {
            query: DICTIONARY_TERM_QUERY,
            variables: {
                key: "sports.sports-jackpots-component-config-page",
            }
        },
        result: {
            data: {
                composedJackpot: {
                    
                }
            }
        }
    }
];

// const searchResultsMock = {
//   request: {
//     query: SEARCH_QUERY,
//     variables: {
//       query: "arse",
//     },
//   },
//   result: {
//     data: searchResults.hasResults,
//   },
// };

// const noSearchResultsMock = {
//   request: {
//     query: SEARCH_QUERY,
//     variables: {
//       query: "nothingtofind",
//     },
//   },
//   result: {
//     data: searchResults.noResults,
//   },
// };

// const notSearchingMock = {
//   request: {
//     query: SEARCH_QUERY,
//     variables: {
//       query: "",
//     },
//   },
//   result: {
//     data: searchResults.noResults,
//   },
// };
