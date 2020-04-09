export const testMock = {
  "0": {
    tableId: 1,
    games: [
      {
        gameId: "game1",
      },
      {
        gameId: "game2",
      },
    ],
  },
  "1": {
    tableId: 2,
    games: [
      {
        gameId: "game3",
      },
      {
        gameId: "game4",
      },
    ],
  },
  "2": {
    tableId: 3,
    games: [
      {
        gameId: "game1",
      },
      {
        gameId: "game2",
      },
    ],
  },
};

export const getOpenTablesMockData = {
  "0": {
    tableId: 1,
    tableDisplayName: "VIP Live Roulette",
    tableType: "DEALER_ROULETTE",
    games: [
      {
        gameId: "lcroulette_mobile_sw",
        maxBet: 10000000,
        minBet: 100,
      },
      {
        gameId: "lcroulette_not_mobile_sw",
        maxBet: 7500000,
        minBet: 100,
      },
    ],
    slots: {
      unlimited: true,
    },
    dealer: {
      nickName: "alpha",
      imageUrl:
        "https://casumo-livegame-test.casinomodule.com/StaffImage/alpha",
    },
    theme: "luxury",
    branding: "casumo",
    tableLang: "en",
    tableBackgroundImageUrl:
      "https://casumo-static-test.casinomodule.com/live_casino/custom-content/lc-brandings/special-unbranded/lobby-table-background-roulette.png",
  },
  "1": {
    tableId: 101,
    tableDisplayName: "Blitz Blackjack Silver",
    tableType: "BLACKJACK_COMMON_DRAW",
    games: [
      {
        gameId: "lcblackjackcd_mobilelr_phy_sw",
        maxBet: 10000,
        minBet: 100,
      },
      {
        gameId: "lcblackjackcd_not_mobilelr_phy_sw",
        maxBet: 10000,
        minBet: 100,
      },
    ],
    slots: {
      unlimited: true,
    },
    dealer: {
      nickName: "lola",
      imageUrl: "https://casumo-livegame-test.casinomodule.com/StaffImage/lola",
    },
    theme: "default",
    branding: "casumo",
    tableLang: "en",
    tableBackgroundImageUrl:
      "https://casumo-static-test.casinomodule.com/live_casino/custom-content/lc-brandings/special-unbranded/lobby-table-background-blackjackcd.png",
  },
  "2": {
    tableId: 102,
    tableDisplayName: "BJCD 102",
    tableType: "BLACKJACK_COMMON_DRAW",
    games: [
      {
        gameId: "lcblackjackcd_mobilelr_sw",
        maxBet: 100000,
        minBet: 100,
      },
      {
        gameId: "lcblackjackcd_mobilelr_phy_sw",
        maxBet: 50000,
        minBet: 100,
      },
    ],
    slots: {
      unlimited: true,
    },
    dealer: {
      nickName: "flavio",
      imageUrl:
        "https://casumo-livegame-test.casinomodule.com/StaffImage/flavio",
    },
    theme: "default",
    branding: "casumo",
    tableLang: "en",
    tableBackgroundImageUrl:
      "https://casumo-static-test.casinomodule.com/live_casino/custom-content/lc-brandings/special-unbranded/lobby-table-background-blackjackcd.png",
  },
};
