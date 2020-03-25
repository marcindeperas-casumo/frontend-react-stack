import { LastGamePlayed } from "../LastGamePlayed.graphql"

export const lastGamePlayedQueryMock = {
  request: {
    query: LastGamePlayed,
  },
  result: {
    data: {
      gamesList: {
        games: [
          { slug: "reel-heist" }
        ]
      }
    }
  },
};
