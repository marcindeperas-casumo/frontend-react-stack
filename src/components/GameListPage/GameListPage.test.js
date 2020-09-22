// @flow
// import * as React from "react";
// import { shallow } from "enzyme";
import { findQueryTranslation } from "./GameListPage.utils";

const allFilters = [
  {
    key: "TYPE_OF_GAME",
    type: "chip",
    title: "Type of game",
    description: "Only see certain live casino games",
    values: [
      {
        key: "BLACKJACK",
        query: "subCategories=BLACKJACK",
        title: "Blackjack",
      },
      {
        key: "ROULETTE",
        query: "subCategories=ROULETTE",
        title: "Roulette",
      },
      {
        key: "BACCARAT",
        query: "subCategories=BACCARAT",
        title: "Baccarat",
      },
      {
        key: "GAME_SHOWS",
        query: "subCategories=GAME_SHOWS",
        title: "Game Shows",
      },
      {
        key: "POKER",
        query: "subCategories=POKER",
        title: "Poker",
      },
      {
        key: "OTHER",
        query: "subCategories=OTHER",
        title: "Other",
      },
    ],
  },
  {
    key: "JACKPOT",
    type: "toggle",
    title: "Jackpot",
    description: "Only show games with a jackpot",
    values: [
      {
        key: "progressiveJackpot",
        query: "gameFeatures=progressiveJackpot",
        title: "Jackpots",
      },
    ],
  },
];

describe("findQueryTranslation", () => {
  test("It Just Works ™", () => {
    expect(findQueryTranslation("subCategories=GAME_SHOWS", allFilters)).toBe(
      "Game Shows"
    );
    expect(
      findQueryTranslation("gameFeatures=progressiveJackpot", allFilters)
    ).toBe("Jackpots");
  });
});
