export default () =>
  Promise.resolve({
    topListsTitle: "Top lists",
    searchTitle: "Type & search",
    topListIds: [
      "latestPlayedGames",
      "popularGames",
      "newGames",
      "casumoFavouriteGames",
      "liveCasino"
    ],
    gamesLists: {
      latestPlayedGames: {
        id: "latestPlayedGames",
        title: "Last Played",
        image: "",
        variants: {
          default: {
            totalGames: 0,
            hash: "d751713988987e9331980363e24189ce"
          },
          guests: {
            totalGames: 0,
            hash: "d751713988987e9331980363e24189ce"
          },
          includeDisabled: {
            totalGames: 0,
            hash: "d751713988987e9331980363e24189ce"
          }
        }
      },
      allGames: {
        id: "allGames",
        title: "All games",
        image: "",
        variants: {
          default: {
            totalGames: 830,
            hash: "b8e19561bc5ffe615893b30a599c82d6"
          },
          guests: {
            totalGames: 830,
            hash: "b8e19561bc5ffe615893b30a599c82d6"
          },
          includeDisabled: {
            totalGames: 1051,
            hash: "a3b60ad4c3d7c431c248d7da845a4f7f"
          }
        }
      },
      casumoFavouriteGames: {
        id: "casumoFavouriteGames",
        title: "Casumo loves",
        image: "",
        variants: {
          default: {
            totalGames: 16,
            hash: "8d6f23c7b6f755d70ec8854f5733ce9a"
          },
          guests: {
            totalGames: 16,
            hash: "8d6f23c7b6f755d70ec8854f5733ce9a"
          },
          includeDisabled: {
            totalGames: 16,
            hash: "8d6f23c7b6f755d70ec8854f5733ce9a"
          }
        }
      },
      newGames: {
        id: "newGames",
        title: "New games",
        image: "",
        variants: {
          default: {
            totalGames: 55,
            hash: "db8062575b6251aec1f6d5b025e2046f"
          },
          guests: {
            totalGames: 55,
            hash: "db8062575b6251aec1f6d5b025e2046f"
          },
          includeDisabled: {
            totalGames: 63,
            hash: "04037df5aec925e721d8324f0dede368"
          }
        }
      },
      popularGames: {
        id: "popularGames",
        title: "Popular",
        image: "",
        variants: {
          default: {
            totalGames: 17,
            hash: "836c6b0f7c4972a5185054a942833d0d"
          },
          guests: {
            totalGames: 17,
            hash: "836c6b0f7c4972a5185054a942833d0d"
          },
          includeDisabled: {
            totalGames: 17,
            hash: "836c6b0f7c4972a5185054a942833d0d"
          }
        }
      },
      liveCasino: {
        id: "liveCasino",
        title: "Live Casino",
        image: "",
        variants: {
          default: {
            totalGames: 2,
            hash: "8a050a382e35d3d67d08bc0ae791684b"
          },
          guests: {
            totalGames: 2,
            hash: "8a050a382e35d3d67d08bc0ae791684b"
          },
          includeDisabled: {
            totalGames: 5,
            hash: "1b58686bc9b81004418b80d2e23c671b"
          }
        }
      }
    }
  });
