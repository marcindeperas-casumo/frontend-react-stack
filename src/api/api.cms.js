// @flow
import { stringify } from "qs";
import http from "Lib/http";

type getPageBySlugArg = {
  slug: string,
  hash: string,
  lang: string,
};
export const getPageBySlug = async ({ slug, hash, lang }: getPageBySlugArg) => {
  if (slug !== "built-pages.top-lists-___en") {
    const queryParams = { hash };
    const queryString = stringify(queryParams, { skipNulls: true });
    const url = `/api/cmsquery/v2/root/${lang}/${slug}?${queryString}`;
    return await http.get(url);
  }

  return {
    id: "90184",
    slug: "top-lists-___en",
    title: "Top Lists En_en",
    content: "",
    attachments: [],
    custom_fields: {},
    fields: {
      critical_for_compliance: false,
      "": false,
      content_builder: [
        {
          acf_fc_layout: "CURATED_CARD",
          card: ["wild-chase-tokyo-go"],
        },
        {
          acf_fc_layout: "GAMES_LIST",
          id: "myList",
        },
        {
          acf_fc_layout: "GAMES_LIST",
          id: "latestPlayedGames",
        },
        {
          acf_fc_layout: "GAMES_LIST",
          id: "popularGames",
        },
        {
          acf_fc_layout: "GAMES_LIST",
          id: "liveCasinoGames",
        },
        {
          acf_fc_layout: "PROMOTION_CARDS_HORIZONTAL",
          title: "Promotions",
          backgroundColor: "blue",
          titleColor: "white",
          slug: "campaigns.winter-games",
        },
        {
          acf_fc_layout: "REEL_RACES",
        },
        {
          acf_fc_layout: "GAMES_LIST",
          id: "suggestedGames",
        },
        {
          acf_fc_layout: "GAMES_LIST",
          id: "newGames",
        },
        {
          acf_fc_layout: "GAMES_LIST",
          id: "casumoFavouriteGames",
        },
        {
          acf_fc_layout: "GAMES_LIST",
          id: "exclusiveGames",
        },
        {
          acf_fc_layout: "MUST_DROP_JACKPOTS_GAMES_LIST",
        },
        {
          acf_fc_layout: "JACKPOTS",
        },
        {
          acf_fc_layout: "GROUPED_LIST_HORIZONTAL",
          title: "Game Providers",
          type: "game-providers",
          slug: false,
        },
      ],
      more_link: "See More",
    },
    children: [],
    childSlugs: [],
  };
};
