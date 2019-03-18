import { stringify } from "qs";
import http from "Services/http";

export const getPageBySlug = async ({ slug, hash, lang }) => {
  const queryParams = { hash };
  const queryString = stringify(queryParams, { skipNulls: true });
  const url = `/api/cmsquery/v2/root/${lang}/${slug}?${queryString}`;
  return await http.get(url);
};
