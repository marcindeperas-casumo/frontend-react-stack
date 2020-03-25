// @flow
import { PlayAgainGameBySlugQuery, PlayAgainLatestPlayedQuery } from "Components/RSModal/SlotControlSystem/AfterLimitsReached.graphql";

const gonzosQuestId = "cd476c51-0842-11e2-b0fd-005056bf4a60";
const deadOrAlive2Id = "23b59520-65cb-11e9-8dbf-0242ac110002";

export const gonzosQuest = {
  // __typename: "Game",
  id: gonzosQuestId,
  slug: "gonzos-quest",
  backgroundImage: "https://cms.casumo.com/wp-content/uploads/2014/06/GonzosQuest_Thumb.jpg",
  logo: "https://cms.casumo.com/wp-content/uploads/2014/02/GonzosQuest_Logo.png",
  name: "Gonzo's Quest",
};

export const deadOrAlive2 = {
  // __typename: "Game",
  id: deadOrAlive2Id,
  slug: "deadoralive2",
  backgroundImage: "https://cms.casumo.com/wp-content/uploads/2014/06/GonzosQuest_Thumb.jpg",
  logo: "https://cms.casumo.com/wp-content/uploads/2014/02/GonzosQuest_Logo.png",
  name: "Dead or Alive 2",
};

export const queryMocks = [
  {
    request: {
      query: PlayAgainGameBySlugQuery,
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
      query: PlayAgainLatestPlayedQuery,
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
