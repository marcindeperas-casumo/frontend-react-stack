import { stringify } from "qs";
import { usingGET as httpGet } from "Utils/index";

export const getPageBySlug = async ({ slug, hash, lang }) => {
  const queryParams = { hash };
  const queryString = stringify(queryParams, { skipNulls: true });
  const url = `cmsquery/v2/root/${lang}/${slug}?${queryString}`;
  const response = await httpGet(url);

  if (url.match("top-lists")) {
    return {
      id: "90193",
      slug: "top-lists-gb_en",
      title: "Top Lists Gb_en",
      content: "",
      attachments: [],
      custom_fields: {},
      fields: {
        critical_for_compliance: false,
        "": false,
        content_builder: [
          {
            acf_fc_layout: "CURATED_CARD",
            card: ["winter-games"],
          },
          {
            acf_fc_layout: "GAMES_LIST",
            id: "latestPlayedGames",
          },
          {
            acf_fc_layout: "GAMES_LIST",
            id: "christmasGames",
          },
          {
            acf_fc_layout: "PROMOTION_CARDS_GALLERY",
            title: "Promotions",
            backgroundColor: "blue",
            titleColor: "white",
            slug: "campaigns.winter-games",
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
            acf_fc_layout: "MUST_DROP_JACKPOTS_GAMES_LIST",
          },
          {
            acf_fc_layout: "GAMES_LIST",
            id: "newGames",
          },
          {
            acf_fc_layout: "GAMES_LIST",
            id: "exclusiveGames",
          },
          {
            acf_fc_layout: "GAMES_LIST",
            id: "casumoFavouriteGames",
          },
          {
            acf_fc_layout: "JACKPOTS",
          },
        ],
        more_link: "See More",
      },
      children: [],
      childSlugs: [],
    };
  }

  return response;
};
