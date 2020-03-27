// @flow
import { ReelRaceListQuery } from "../ReelRacesListContainer.graphql";

const reelRaces = [
  {
    id: "e84d5f50-6de3-11ea-a450-0242ac110006",
    game: {
      id: "fab03150-4873-11e8-b2c4-0242ac110002",
      name: "Legacy of Egypt",
      logo:
        "https://cms.casumo.com/wp-content/uploads/2018/04/legacy_of_egypt_logo.png",
      backgroundImage:
        "https://cms.casumo.com/wp-content/uploads/2018/04/legacy_of_egypt_thumbnail.jpg",
      slug: "legacy-of-egypt",
    },
    startTime: 1585335600000,
    optedIn: false,
    endTime: 1585338600000,
    status: "Scheduled",
    spinLimit: 500,
    promoted: true,
    formattedPrize: "£500",
    remainingSpins: 0,
    translations: {
      optedInCtaSingleGameShort: "Play",
      optIn: "Opt in",
      optedIn: "Opted in",
      endingIn: "Ending in",
      startingIn: "Starting in:",
      competeFor: "Compete for {{prize}}",
      spins: "Spins",
      duration: "Duration",
      durationTemplate: "{{{duration}}} min",
      caveatShort:
        'Opt in. Spins/Games restrictions. <a href="#" {{{ ctaTermsAndConditions }}}><strong>T&C’s apply.</strong></a>',
      today: "Today",
      tomorrow: "Tomorrow",
    },
  },
  {
    id: "e7083520-6de3-11ea-a450-0242ac110006",
    game: {
      id: "6940f040-36b7-11ea-9bcb-0242ac110003",
      name: "Piggy Riches Megaways",
      logo:
        "https://cms.casumo.com/wp-content/uploads/2020/01/piggy_riches_Thumbnail_Logo.png",
      backgroundImage:
        "https://cms.casumo.com/wp-content/uploads/2020/01/piggy_riches_Thumbnail_BG.png",
      slug: "piggy-riches-megaways",
    },
    startTime: 1585312200000,
    optedIn: false,
    endTime: 1585313700000,
    status: "Started",
    spinLimit: 190,
    promoted: false,
    formattedPrize: "£20",
    remainingSpins: 0,
    translations: {
      optedInCtaSingleGameShort: "Play",
      optIn: "Opt in",
      optedIn: "Opted in",
      endingIn: "Ending in",
      startingIn: "Starting in:",
      competeFor: "Compete for {{prize}}",
      spins: "Spins",
      duration: "Duration",
      durationTemplate: "{{{duration}}} min",
      caveatShort:
        'Opt in. Spins/Games restrictions. <a href="#" {{{ ctaTermsAndConditions }}}><strong>T&C’s apply.</strong></a>',
      today: "Today",
      tomorrow: "Tomorrow",
    },
  },
  {
    id: "e72d4950-6de3-11ea-a450-0242ac110006",
    game: {
      id: "3e054070-b89c-11e7-b304-005056a03af2",
      name: "Reactoonz",
      logo:
        "https://cms.casumo.com/wp-content/uploads/2017/10/reactoonz_logo.png",
      backgroundImage:
        "https://cms.casumo.com/wp-content/uploads/2017/10/reactoonz_thumbnail.jpg",
      slug: "reactoonz",
    },
    startTime: 1585314000000,
    optedIn: false,
    endTime: 1585315500000,
    status: "Scheduled",
    spinLimit: 190,
    promoted: false,
    formattedPrize: "£20",
    remainingSpins: 0,
    translations: {
      optedInCtaSingleGameShort: "Play",
      optIn: "Opt in",
      optedIn: "Opted in",
      endingIn: "Ending in",
      startingIn: "Starting in:",
      competeFor: "Compete for {{prize}}",
      spins: "Spins",
      duration: "Duration",
      durationTemplate: "{{{duration}}} min",
      caveatShort:
        'Opt in. Spins/Games restrictions. <a href="#" {{{ ctaTermsAndConditions }}}><strong>T&C’s apply.</strong></a>',
      today: "Today",
      tomorrow: "Tomorrow",
    },
  },
];

const reelRacesTranslations = {
  title: "Reel Race",
  seeMore: "See More",
};

export const reelRacesListQueryMock = {
  request: {
    query: ReelRaceListQuery,
    variables: { limit: reelRaces.length },
  },
  result: {
    data: {
      ...reelRacesTranslations,
      reelRaces,
    },
  },
};
