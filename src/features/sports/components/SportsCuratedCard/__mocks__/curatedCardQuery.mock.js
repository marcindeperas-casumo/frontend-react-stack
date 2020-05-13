import { CuratedCardQuery } from "Components/CuratedCard/CuratedCard.graphql";

export const curatedCardQueryMock = {
  request: {
    query: CuratedCardQuery,
    variables: {
      slug: "curated-sports",
    },
  },
  result: {
    data: {
      curatedCard: {
        id: "curated-sports",
        slug: "curated-sports",
        type: "sports",
        image: null,
        smallImage:
          "https://cms.casumo.com/wp-content/uploads/2019/09/Mobile-2@4x.png",
        mediumImage:
          "https://cms.casumo.com/wp-content/uploads/2019/09/Tablet-1@4x.png",
        largeImage:
          "https://cms.casumo.com/wp-content/uploads/2019/09/Tablet-1@4x.png",
        header: "Get your</br>Sports Free Bets",
        subtitle: "yay",
        promotionSlug: null,
        promotionLegalText: "",
        launchGameText: "",
        game: null,
      },
    },
  },
};
