import { CuratedCardQuery } from "Components/CuratedCard/CuratedCard.graphql";

export const curatedCardQueryMock = {
  request: {
    query: CuratedCardQuery,
    variables: {
      slug: "welcome-offer-sports",
    },
  },
  result: {
    data: {
      curatedCard: {
        id: "welcome-offer-sports",
        slug: "welcome-offer-sports",
        type: "welcome offer",
        image: null,
        smallImage:
          "https://cms.casumo.com/wp-content/uploads/2019/09/Mobile-2@4x.png",
        mediumImage:
          "https://cms.casumo.com/wp-content/uploads/2019/09/Tablet-1@4x.png",
        largeImage:
          "https://cms.casumo.com/wp-content/uploads/2019/09/Tablet-1@4x.png",
        header: "Get your</br>Sports Welcome Bonus",
        subtitle: "WELCOME BONUS",
        promotionSlug: null,
        promotionLegalText:
          "Min bet £10 at odds 1.6 or higher, receive £10 Free bet. Qualifying and Free bet must be placed within 35 days of registration. Free bet available after qualifying bet settled. Free bet non-withdrawable. T&Cs apply",
        launchGameText: "Get your Welcome Bonus",
        game: null,
      },
    },
  },
};
