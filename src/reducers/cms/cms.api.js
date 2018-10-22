import { stringify } from "qs";
import { usingGET as httpGet } from "Utils/index";

export const getPageBySlug = async ({ slug, hash, lang }) => {
  const queryParams = { hash };
  const queryString = stringify(queryParams, { skipNulls: true });
  const url = `cmsquery/v2/root/${lang}/${slug}?${queryString}`;
  const response = await httpGet(url);

  return { cms: response };
};
