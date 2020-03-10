// @flow
import { GAME_BY_SLUG_QUERY, LATEST_PLAYED_QUERY } from "Components/RSModal/SlotControlSystem/AfterLimitsReached";

const gonzosQuestId = "cd476c51-0842-11e2-b0fd-005056bf4a60";
const deadOrAlive2Id = "23b59520-65cb-11e9-8dbf-0242ac110002";

export const gonzosQuest = {
  id: gonzosQuestId,
  slug: "gonzos-quest",
  logo: "/logo-img.png",
  logoBackground: "/logo-bg.png",
  name: "Gonzo's Quest",
};

export const deadOrAlive2 = {
  id: deadOrAlive2Id,
  slug: "deadoralive2",
  logo: "/logo-img.png",
  logoBackground: "/logo-bg.png",
  name: "Dead or Alive 2",
};

export const queryMocks = [
  {
    request: {
      query: GAME_BY_SLUG_QUERY,
      variables: {
        slug: "gonzos-quest",
      },
    },
    result: {
      data: {
        gamesBySlugs: [
          gonzosQuest
        ],
      },
    },
  },
  {
    request: {
      query: LATEST_PLAYED_QUERY,
    },
    result: {
      data: {
        gamesList: {
          games: [
            deadOrAlive2
          ]
        }
      }
    }
  },
];
