import { CuratedCardQuery } from "Components/CuratedCard/CuratedCard.graphql";

export const curatedCardQueryMock = {
  request: {
    query: CuratedCardQuery,
    variables: {
      slug: "sports",
    },
  },
  result: {
    data: {
      curatedCard: {
        id: "sports",
        slug: "sports",
        type: "sports",
        image: null,
        smallImage:
          "https://cms.casumo.com/wp-content/uploads/2019/09/Mobile-2@4x.png",
        mediumImage:
          "https://cms.casumo.com/wp-content/uploads/2019/09/Tablet-1@4x.png",
        largeImage:
          "https://cms.casumo.com/wp-content/uploads/2019/09/Tablet-1@4x.png",
        header: "Bundesliga is happening",
        subtitle: "Yay, Football",
        promotionSlug: null,
        promotionLegalText: null,
        launchGameText: null,
        game: null,
        sportsRoute: "filter/sports",
      },
    },
  },
};
