import { ReelRaceWidgetQuery } from "../ReelRaceWidget.graphql";

export const getReelRaceWidgetQueryMock = () => {
  const now = Date.now();
  const minute = 60 * 1000;
  
  return {
    request: {
      query: ReelRaceWidgetQuery,
    },
    result: {
      data: {
        reelRaces: [
          {
            id: "3d387770-6abf-11ea-a450-0242ac110006",
            game: {
              slug: "legacy-of-egypt",
              name: "Legacy of Egypt",
              logo:
                "https://cms.casumo.com/wp-content/uploads/2018/04/legacy_of_egypt_logo.png",
              backgroundImage:
                "https://cms.casumo.com/wp-content/uploads/2018/04/legacy_of_egypt_thumbnail.jpg",
            },
            startTime: now + 30 * minute,
            endTime: now + 60 * minute,
            optedIn: true,
            promoted: true,
            spinLimit: 500,
            formattedPrize: "€500",
            cometdChannels: [
              "/public/tournaments/2c8217e0-424a-3562-979c-b9adbfadc9d1",
              "/public/tournaments/9fae72a2-0f04-34e9-a543-10b552138d3f",
              "/public/tournaments/8c6d9e9b-4ba3-34a9-8aa4-1ee86534a742",
              "/public/tournaments/d62ae9ad-c7ef-3774-af90-696b23c92ec1",
              "/public/tournaments/c713af5e-80ec-3f4a-949e-e7a2dfbf0a78",
            ],
            leaderboard: [
              {
                playerId: "66a6aa80-2919-11e8-9400-0242ac11000a",
                playerName: "futuun",
                position: 1,
                points: 0,
                remainingSpins: 500,
                boosters: {
                  winsInARow: 0,
                  triples: 0,
                  wins: 0,
                  bigWins: 0,
                  megaWins: 0,
                },
              },
            ],
          },
        ],
      },
    },
  }
}
