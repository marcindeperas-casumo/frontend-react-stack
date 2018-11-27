import { stringify } from "qs";
import { usingGET as httpGet } from "Utils/index";

export const getPageBySlug = async ({ slug, hash, lang }) => {
  const queryParams = { hash };
  const queryString = stringify(queryParams, { skipNulls: true });
  const url = `cmsquery/v2/root/${lang}/${slug}?${queryString}`;
  const response = await httpGet(url);

  if (url.match("top-lists")) {
    return {
      id: "87740",
      slug: "top-lists-en",
      title: "Top Lists En",
      content: "",
      attachments: [],
      custom_fields: {},
      fields: {
        critical_for_compliance: false,
        "": false,
        content_builder: [
          { acf_fc_layout: "CURATED_CARD", card: ["curated-___en"] },
          { acf_fc_layout: "GAMES_LIST", id: "latestPlayedGames" },
          { acf_fc_layout: "GAMES_LIST", id: "popularGames" },
          { acf_fc_layout: "GAMES_LIST", id: "newGames" },
          {
            acf_fc_layout: "PROMOTION_CARDS_HORIZONTAL",
            slug: "campaigns.winter-games",
            title: "All Promotions",
            titleColor: "white",
            backgroundColor: "blue",
          },
          { acf_fc_layout: "GAMES_LIST", id: "exclusiveGames" },
          { acf_fc_layout: "MUST_DROP_JACKPOTS_GAMES_LIST" },
          { acf_fc_layout: "GAMES_LIST", id: "casumoFavouriteGames" },
          { acf_fc_layout: "GAMES_LIST", id: "liveCasinoGames" },
          { acf_fc_layout: "JACKPOTS" },
        ],
      },
      children: [],
      childSlugs: [],
    };
  }

  return response;
};
