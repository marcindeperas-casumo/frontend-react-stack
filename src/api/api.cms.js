// @flow
import { stringify } from "qs";
import http from "Lib/http";

type getPageBySlugArg = {
  slug: string,
  hash: string,
  lang: string,
};
export const getPageBySlug = async ({ slug, hash, lang }: getPageBySlugArg) => {
  const queryParams = { hash };
  const queryString = stringify(queryParams, { skipNulls: true });
  const url = `/api/cmsquery/v2/root/${lang}/${slug}?${queryString}`;
  return await http.get(url).then(result => {
    if (result.slug.indexOf("top-lists") !== -1) {
      const myList = {
        acf_fc_layout: "GAMES_LIST",
        id: "myList",
      };
      // eslint-disable-next-line fp/no-mutating-methods
      result.fields.content_builder.splice(1, 0, myList);
    }
    return result;
  });
};
