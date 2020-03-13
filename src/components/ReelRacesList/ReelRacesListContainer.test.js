import { getValidReelRaces } from "./ReelRacesListContainer";

const reelRaces = [
  {
    id: "4c9b2d60-4d97-11ea-88c8-0242ac110006",
    game: {
      id: "fe389350-9989-11e8-9172-0242ac110002",
      name: "Wolf Gold",
      logo:
        "https://cms.casumo.com/wp-content/uploads/2018/08/wolf_gold_logo.png",
      backgroundImage:
        "https://cms.casumo.com/wp-content/uploads/2018/08/wolf_gold_thumbnail.jpg",
    },
    startTime: 1592088400000,
    optedIn: false,
    endTime: 1592088400001,
  },
  {
    id: "5c9b2d60-4d97-11ea-88c8-0242ac110006",
    game: {
      id: "fe389350-9989-11e8-9172-0242ac110002",
      name: "Wolf Silver",
      logo:
        "https://cms.casumo.com/wp-content/uploads/2018/08/wolf_gold_logo.png",
      backgroundImage:
        "https://cms.casumo.com/wp-content/uploads/2018/08/wolf_gold_thumbnail.jpg",
    },
    startTime: 1572088400000,
    optedIn: false,
    endTime: 1572089600000,
  },
  {
    id: "6c9b2d60-4d97-11ea-88c8-0242ac110006",
    game: {},
    startTime: 1582088400000,
    optedIn: false,
    endTime: 1582089600000,
  },
];

describe("ReelRacesListContainer", () => {
  test("should return only the reel races that have a game, that have not started yet, or the ones which have started and the player has opted in", () => {
    const validReelRaces = getValidReelRaces(reelRaces);

    expect(validReelRaces).toHaveLength(1);
  });
});
