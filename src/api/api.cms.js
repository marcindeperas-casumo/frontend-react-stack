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
  return await http.get(url);
};
